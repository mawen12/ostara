export const apiKeys = {
  theme: () => ['theme'],
  themeSource: () => ['themeSource'],

  items: () => ['items'],
  item: (id: string) => [...apiKeys.items(), id],
  itemCaches: (id: string) => [...apiKeys.item(id), 'caches'],
  itemCacheStatistics: (id: string, cacheName: string) => [...apiKeys.itemCaches(id), 'statistics', cacheName],
  itemLoggers: (id: string) => [...apiKeys.item(id), 'loggers'],
  itemEnv: (id: string) => [...apiKeys.item(id), 'env'],
  itemEnvProperties: (id: string) => [...apiKeys.item(id), 'envProperties'],
  itemBeans: (id: string) => [...apiKeys.item(id), 'beans'],
  itemProperties: (id: string) => [...apiKeys.item(id), 'properties'],
  itemFlyway: (id: string) => [...apiKeys.item(id), 'flyway'],
  itemFlywayByContext: (id: string, context: string) => [...apiKeys.itemFlyway(id), 'context', context],
  itemScheduledTasks: (id: string) => [...apiKeys.item(id), 'scheduledTasks'],
  itemScheduledTasksCron: (id: string) => [...apiKeys.itemScheduledTasks(id), 'cron'],
  itemScheduledTasksFixedDelay: (id: string) => [...apiKeys.itemScheduledTasks(id), 'fixedDelay'],
  itemScheduledTasksFixedRate: (id: string) => [...apiKeys.itemScheduledTasks(id), 'fixedRate'],
  itemScheduledTasksFixed: (id: string, type: string) => [...apiKeys.itemScheduledTasks(id), 'fixed', type],
  itemScheduledTasksCustom: (id: string) => [...apiKeys.itemScheduledTasks(id), 'custom'],
  itemLiquibase: (id: string) => [...apiKeys.item(id), 'liquibase'],
  itemLiquibaseByContext: (id: string, context: string) => [...apiKeys.itemLiquibase(id), 'context', context],
  itemHttpRequestStatistics: (id: string) => [...apiKeys.item(id), 'httpRequestStatistics'],
  itemHttpRequestStatisticsForUriByMethods: (id: string, uri: string) => [
    ...apiKeys.itemHttpRequestStatistics(id),
    'uri',
    uri,
    'methods',
  ],
  itemHttpRequestStatisticsForUriByStatuses: (id: string, uri: string) => [
    ...apiKeys.itemHttpRequestStatistics(id),
    'uri',
    uri,
    'statuses',
  ],
  itemHttpRequestStatisticsForUriByOutcomes: (id: string, uri: string) => [
    ...apiKeys.itemHttpRequestStatistics(id),
    'uri',
    uri,
    'outcomes',
  ],
  itemHttpRequestStatisticsForUriByExceptions: (id: string, uri: string) => [
    ...apiKeys.itemHttpRequestStatistics(id),
    'uri',
    uri,
    'exceptions',
  ],
  itemInstances: (id: string) => [...apiKeys.item(id), 'instances'],
  itemHeapdumps: (id: string) => [...apiKeys.item(id), 'heapdumps'],

  actuator: () => ['actuator'],
  actuatorConnection: (url: string) => [...apiKeys.actuator(), 'connection', url],

  metrics: () => ['metrics'],
  metricLatest: (instanceId: string, metricName: string) => [...apiKeys.metrics(), 'latest', instanceId, metricName],
};
