# Websocket

使用 `Stompjs` + `Spring Boot Websocket` 前后端通信。

## 流程

`Stompjs` 可以借助 `Websocket` 来向后端发送订阅的信息。
`Spring Boot Websocket` 支持 `Stomp` 协议，并将前端订阅的信息通过 `Websocket` 发送回前端。

## WebsocketTopics

`WebsocketTopics` 维护了后端涉及的所有 `Topic`。

- `/topic/metric` `InstanceMetricWebsocketTopicInterceptor` 用于处理 metric 相关的信息
- `/topic/agentDiscoveryStart` `AgentDiscoveryStartedEventMessage` 在 `AgentDiscoveryService#runDiscoveryForAgent` 刚开始执行时触发
- `/topic/agentDiscoverySuccess` `AgentDiscoverySucceededEventMessage` 在 `AgentDiscoveryService#runDiscoveryForAgent` 执行成功时触发
- `/topic/agentDiscoveryFailre` `AgentDiscoveryFailedEventMessage` 在 `AgentDiscoveryService#runDiscoveryForAgent` 执行期间时，出现异常时触发
- `/topic/agentHealth` `AgentHealthUpdatedEventMessage` 在 `AgentHealthService#refreshAgentHealth` 执行期间时，当检测发现此次和上一次的健康不一致时触发
- `/topic/applicationCreation` `ApplicationCreatedEventMessage` 在 `ApplicationEventPersistentHooks` 中的生命周期方法中调用
- `/topic/applicationDeletion` `ApplicationDeletedEventMessage` 在 `ApplicationEventPersistentHooks` 中的生命周期方法中调用
- `/topic/applicationDeletion` `ApplicationUpdatedEventMessage` 在 `ApplicationEventPersistentHooks` 中的生命周期方法中调用
- `/topic/applicationHealth` `ApplicationHealthUpdatedEventMessage` 在 `ApplicationHealthService#handleInstanceHealthChange` 执行期间时，当检测发现此次和上一次的健康度不一致时触发
- `/topic/instanceHeapdumpDownloadProgress` `InstanceHeapdumpDownloadProgressMessage` 在 `InstanceHeapdumpService#downloadPendingHeapdump` 执行期间时，下载进度的监听
- `/topic/instanceAbility` `InstanceAbilitiesRefreshedEventMessage` 在 `InstanceAbilityServiceImpl#getAbilities` 执行期间时，当发现返回的 ability 不一致时触发
- `/topic/instanceCreation` `InstanceCreatedEventMessage` 在 `InstanceCreatedEventMessage#postCreate` 执行期间时触发
- `/topic/instanceDeletion` `InstanceDeletedEventMessage` 在 `InstanceEventPersistentHooks#postDelete` 执行期间时触发
- `/topic/instanceHealth` `InstanceHealthChangedEventMessage` 在 `InstanceHealthService#updateInstanceHealth` 时触发
- `/topic/instanceHostname` `InstanceHostnameUpdatedEventMessage` 在 `InstanceHostnameService#resolveAndUpdateHostname` 更新了 hostname 时触发
- `/topic/instanceUpdate` `InstanceUpdatedEventMessage` 在 `InstanceEventPersistentHooks#postUpdate` 执行时触发
- `/topic/instanceMetadata` `InstanceMetadataRefreshedMessage` 在 `InstanceMetadataService#getMetadata` 执行时触发
- `/topic/applicationMetricRuleTriggers` `ApplicationMetricRuleTriggeredMessage` 在 `IntegrationConfig#applicationMetricRuleTriggerFlow` 执行期间触发
- `/topic/instanceThreadProfiliingProgress` `ThreadProfilingProgressMessage` 在 `ThreadProfilingService#runProfiling` 执行期间触发

## Tpoic Metric

用于从后端订阅指定的 Metric 信息。格式为: `/topic/metric/<instanceId>/<metricName>[VALUE]`。

- `instanceId` 通过该 instanceId 获取 Actuator URL
- `metricName` `/actuator/metrics` 下的指定 `metric`
- `[VALUE]` 是指用于从 `measurements` 下匹配 `statistic == VALUE` 的值

返回值结构：

- `name`: `<metricName>[VALUE]`
- `description`: null
- `unit`: null
- `value`
  - `value`: 匹配 `statistic` 的值
  - `timestamp`: 当前时间
