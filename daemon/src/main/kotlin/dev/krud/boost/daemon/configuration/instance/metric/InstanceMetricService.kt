package dev.krud.boost.daemon.configuration.instance.metric

import dev.krud.boost.daemon.configuration.instance.InstanceActuatorClientProvider
import dev.krud.boost.daemon.configuration.instance.InstanceService
import dev.krud.boost.daemon.configuration.instance.ability.InstanceAbilityService
import dev.krud.boost.daemon.configuration.instance.enums.InstanceAbility
import dev.krud.boost.daemon.configuration.instance.metric.ro.InstanceMetricRO
import dev.krud.boost.daemon.configuration.instance.metric.ro.InstanceMetricValueRO
import dev.krud.boost.daemon.exception.throwBadRequest
import dev.krud.boost.daemon.exception.throwNotFound
import io.github.oshai.KotlinLogging
import org.springframework.stereotype.Service
import java.util.*

@Service
class InstanceMetricService(
    private val actuatorClientProvider: InstanceActuatorClientProvider,
    private val instanceService: InstanceService,
    private val instanceAbilityService: InstanceAbilityService
) {
    fun getLatestMetric(instanceId: UUID, metricName: String): InstanceMetricRO {
        log.debug { "Get latest metric for instance $instanceId and metric name $metricName" }
        val instance = instanceService.getInstanceFromCacheOrThrow(instanceId)
        instanceAbilityService.hasAbilityOrThrow(instance, InstanceAbility.METRICS)
        val response = actuatorClientProvider.doWith(instance) { client ->
            val parsedMetricName = parseMetricName(metricName)
            client.metric(parsedMetricName.name)
                .getOrThrow()
                .measurements
                .filter { it.statistic == parsedMetricName.statistic }
                .maxOfOrNull { it.value } ?: throwNotFound("Metric not found: $parsedMetricName")
        }
        return InstanceMetricRO(
            name = metricName,
            description = null,
            unit = null,
            values = listOf(
                InstanceMetricValueRO(
                    value = response,
                    timestamp = Date()
                )
            )
        )
    }

    private fun parseMetricName(metricName: String): ParsedMetricName {
        val match = METRIC_NAME_REGEX.matchEntire(metricName) ?: throwBadRequest("Invalid metric name: $metricName")
        return ParsedMetricName(match.groupValues[1], match.groupValues[2])
    }

    private data class ParsedMetricName(
        val name: String,
        val statistic: String
    ) {
        override fun toString(): String {
            return "$name[$statistic]"
        }
    }

    companion object {
        private val METRIC_NAME_REGEX = Regex("(.*)\\[(.*)\\]")
        private val log = KotlinLogging.logger { }
    }
}