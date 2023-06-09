import {
  ApplicationHealthUpdatedEventMessage$Payload,
  InstanceHealthChangedEventMessage$Payload,
  InstanceHeapdumpDownloadProgressMessage$Payload,
  InstanceHostnameUpdatedEventMessage$Payload,
  InstanceMetricRO,
  ThreadProfilingProgressMessage$Payload,
} from '../../../common/generated_definitions';

// STOMP 主题
export type StompTopics = {
  // 实例健康 主题
  '/topic/instanceHealth': InstanceHealthChangedEventMessage$Payload;
  // 应用健康 主题
  '/topic/applicationHealth': ApplicationHealthUpdatedEventMessage$Payload;
  // 指标 主题
  '/topic/metric/:instanceId/:metricName': InstanceMetricRO;
  // 实例主机名 主题
  '/topic/instanceHostname': InstanceHostnameUpdatedEventMessage$Payload;
  // 实例堆快照下载进程 主题
  '/topic/instanceHeapdumpDownloadProgress': InstanceHeapdumpDownloadProgressMessage$Payload;
  // 实例线程分析进程 主题
  '/topic/instanceThreadProfilingProgress': ThreadProfilingProgressMessage$Payload;
};

export type StompTopicKey = keyof StompTopics;
