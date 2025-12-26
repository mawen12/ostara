package dev.krud.boost.daemon.configuration.instance.heapdump

import dev.krud.boost.daemon.actuator.ActuatorHttpClient
import dev.krud.boost.daemon.configuration.instance.InstanceActuatorClientProvider
import dev.krud.boost.daemon.configuration.instance.InstanceService
import dev.krud.boost.daemon.messaging.InstanceHeapdumpDownloadProgressMessage
import dev.krud.boost.daemon.messaging.InstanceHeapdumpDownloadRequestMessage
import dev.krud.boost.daemon.configuration.instance.heapdump.model.InstanceHeapdumpReference
import dev.krud.boost.daemon.configuration.instance.heapdump.model.InstanceHeapdumpReference.Companion.failed
import dev.krud.boost.daemon.configuration.instance.heapdump.model.InstanceHeapdumpReference.Companion.ready
import dev.krud.boost.daemon.configuration.instance.heapdump.ro.InstanceHeapdumpReferenceRO
import dev.krud.boost.daemon.configuration.instance.heapdump.store.InstanceHeapdumpStore
import dev.krud.boost.daemon.exception.throwBadRequest
import dev.krud.boost.daemon.exception.throwNotFound
import dev.krud.boost.daemon.okhttp.ProgressListener
import dev.krud.boost.daemon.utils.emptyResult
import dev.krud.crudframework.crud.handler.krud.Krud
import dev.krud.shapeshift.ShapeShift
import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.beans.factory.InitializingBean
import org.springframework.integration.annotation.ServiceActivator
import org.springframework.integration.channel.PublishSubscribeChannel
import org.springframework.integration.channel.QueueChannel
import org.springframework.stereotype.Service
import java.io.IOException
import java.io.InputStream
import java.util.*
import java.util.concurrent.ConcurrentHashMap

@Service
class InstanceHeapdumpService(
    private val instanceHeapdumpReferenceKrud: Krud<InstanceHeapdumpReference, UUID>,
    private val shapeShift: ShapeShift,
    private val instanceService: InstanceService,
    private val actuatorClientProvider: InstanceActuatorClientProvider,
    private val instanceHeapdumpStore: InstanceHeapdumpStore,
    private val instanceHeapdumpDownloadRequestChannel: QueueChannel,
    private val instanceHeapdumpDownloadProgressInputChannel: PublishSubscribeChannel
) : InitializingBean {
    private val mutex = Any()

    // 下载中, key: referenceId, value: 
    private val ongoingDownloads = ConcurrentHashMap<UUID, ActuatorHttpClient.HeapdumpResponse>()

    override fun afterPropertiesSet() {
        synchronized(mutex) {
            // 将DOWNLOADING的记录重置为PENDING_DOWNLOAD
            // 1.服务重启时保证未完成下载的 heap dump 可以重新恢复下载
            // 2.避免遗留状态一直停留在 DOWNLOADING
            instanceHeapdumpReferenceKrud
                .updateByFilter(
                    false,
                    {
                        where {
                            InstanceHeapdumpReference::status Equal InstanceHeapdumpReference.Status.DOWNLOADING
                        }
                    }
                ) {
                    status = InstanceHeapdumpReference.Status.PENDING_DOWNLOAD
                }
                .forEach {
                    // 发送到下载请求队列
                    instanceHeapdumpDownloadRequestChannel.send(
                        InstanceHeapdumpDownloadRequestMessage(
                            InstanceHeapdumpDownloadRequestMessage.Payload(
                                it.id,
                                it.instanceId
                            )
                        )
                    )
                }
        }
    }

    // 根据 ID 获取 heapdump reference,如果不存在返回 null
    fun getHeapdumpReference(referenceId: UUID): InstanceHeapdumpReference? {
        log.debug {
            "Getting heapdump reference $referenceId"
        }
        return instanceHeapdumpReferenceKrud.showById(referenceId)
    }

    // 根据 ID 获取 heapdump reference,如果不存在抛出 Not Found 异常
    fun getHeapdumpReferenceOrThrow(referenceId: UUID): InstanceHeapdumpReference {
        return getHeapdumpReference(referenceId) ?: throwNotFound("Heapdump $referenceId not found")
    }

    // 请求生成新的 heapdump(异步下载)
    fun requestHeapdump(instanceId: UUID): InstanceHeapdumpReferenceRO {
        log.debug {
            "Requesting heapdump for instance $instanceId"
        }
        // 校验示例是否存在
        instanceService.getInstanceOrThrow(instanceId)
        // 创建 InstanceHeapdumpReference 对象,状态默认为 PENDING_DOWNLOAD 
        val reference = instanceHeapdumpReferenceKrud.create(
            InstanceHeapdumpReference(
                instanceId
            )
        )
        log.debug {
            "Created heapdump reference $reference"
        }
        // 发送 InstanceHeapdumpDownloadRequestMessage 到下载队列
        instanceHeapdumpDownloadRequestChannel.send(
            InstanceHeapdumpDownloadRequestMessage(
                InstanceHeapdumpDownloadRequestMessage.Payload(
                    reference.id,
                    instanceId
                )
            )
        )
        // 返回 Reference 的只读对象
        return shapeShift.map(
            reference,
            InstanceHeapdumpReferenceRO::class.java
        )
    }

    // 通过 Spring Integration 的 @ServiceActivator 从队列触发下载流程
    @ServiceActivator(inputChannel = "instanceHeapdumpDownloadRequestChannel")
    fun downloadPendingHeapdump(payload: InstanceHeapdumpDownloadRequestMessage.Payload) {
        log.debug { "Downloading heapdump for instance ${payload.instanceId}" }
        val (referenceId, instanceId) = payload
        // 将 reference 记录更新为 DOWNLOADING
        val reference = instanceHeapdumpReferenceKrud.updateById(referenceId) {
            status = InstanceHeapdumpReference.Status.DOWNLOADING
        }
        try {
            // 获取实例信息
            val instance = instanceService.getInstanceOrThrow(instanceId)
            // 获取 actuator client
            val client = actuatorClientProvider.provide(instance)
            // 定义下载回调,每次读取 bytes 时发送进度消息
            val downloadProgressListener: ProgressListener = { bytesRead, contentLength, done ->
                instanceHeapdumpDownloadProgressInputChannel.send(
                    InstanceHeapdumpDownloadProgressMessage(
                        InstanceHeapdumpDownloadProgressMessage.Payload(
                            referenceId,
                            instanceId,
                            bytesRead,
                            contentLength,
                            if (done) InstanceHeapdumpReference.Status.READY else InstanceHeapdumpReference.Status.DOWNLOADING
                        )
                    )
                )
            }
            // 下载完成后存储文件,更新 reference 状态为 READY
            val onDownloadCompleted: (InputStream) -> Unit = { inputStream ->
                ongoingDownloads.remove(referenceId)
                // 从流中读取并保存文件
                val (path, size) = instanceHeapdumpStore.storeHeapdump(reference.id, inputStream)
                    .getOrThrow()
                reference.ready(
                    path = path,
                    size = size)
                reference.update()
            }

            // 下载失败,更新状态为 FAILED
            val onDownloadFailed: (IOException) -> Unit = { error ->
                ongoingDownloads.remove(referenceId)
                reference.failed(error)
                reference.update()
            }

            // 取消下载
            val onDownloadCancelled: () -> Unit = {
                ongoingDownloads.remove(referenceId)
            }

            // 执行下载
            val response = client.heapDump(downloadProgressListener, onDownloadCompleted, onDownloadFailed, onDownloadCancelled)
                .getOrThrow()
            // 将正在下载的对象放入 ongoingDownloads
            ongoingDownloads.putIfAbsent(referenceId, response)
        } catch (e: Exception) {
            log.error(e) { "Failed to download heapdump for instance $instanceId" }
            // 下载异常时,更新为失败状态
            reference.failed(e)
            reference.update()
            // 发送失败的消息到队列
            instanceHeapdumpDownloadProgressInputChannel.send(
                InstanceHeapdumpDownloadProgressMessage(
                    InstanceHeapdumpDownloadProgressMessage.Payload(
                        reference.id,
                        instanceId,
                        -1,
                        -1,
                        InstanceHeapdumpReference.Status.FAILED,
                        reference.error
                    )
                )
            )
        }
    }

    // 取消正在下载的 heap dump,
    fun cancelHeapdumpDownload(referenceId: UUID) {
        log.debug { "Cancelling heapdump download for reference $referenceId" }
        val response = ongoingDownloads[referenceId]
        response?.cancelDownload?.invoke()
        ongoingDownloads.remove(referenceId)
    }

    // 提供获取已下载的 heap dump 文件内容
    fun downloadHeapdump(referenceId: UUID): InputStream {
        val reference = getHeapdumpReferenceOrThrow(referenceId)
        if (reference.status != InstanceHeapdumpReference.Status.READY) {
            throwBadRequest("Heapdump $referenceId is not ready")
        }
        return instanceHeapdumpStore.getHeapdump(referenceId)
            .getOrThrow()
    }

    // 删除 heap dump 文件以及对应的 reference
    fun deleteHeapdump(referenceId: UUID) {
        log.debug { "Deleting heapdump $referenceId" }
        val reference = getHeapdumpReferenceOrThrow(referenceId)
        val result = when (reference.status) {
            // PENDING_DOWNLOAD/FAILED 直接删除
            InstanceHeapdumpReference.Status.PENDING_DOWNLOAD -> emptyResult()
            // DOWNLOADING 先取消下载,再删除
            InstanceHeapdumpReference.Status.DOWNLOADING -> {
                cancelHeapdumpDownload(referenceId)
                emptyResult()
            }
            // READY 删除文件,然后删除 reference 
            InstanceHeapdumpReference.Status.READY -> {
                instanceHeapdumpStore.deleteHeapdump(referenceId)
            }
            InstanceHeapdumpReference.Status.FAILED -> emptyResult()
        }
        result.getOrThrow()
        instanceHeapdumpReferenceKrud.deleteById(referenceId)
    }

    private fun InstanceHeapdumpReference.update() {
        instanceHeapdumpReferenceKrud.updateById(this.id) {
            this.status = this@update.status
            this.error = this@update.error
            this.path = this@update.path
            this.size = this@update.size
        }
    }

    companion object {
        private val log = KotlinLogging.logger { }
    }
}