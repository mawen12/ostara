/* tslint:disable */
/* eslint-disable */

// 动态模型过滤器
export interface DynamicModelFilter {
    start?: number; // 开始位置
    limit?: number; // 限制数
    orders: OrderDTO[]; // 排序数组
    filterFields: FilterField[]; // 过滤字段
    cacheKey: string; // 缓存键
}

// 分页结果
export interface PagedResult<T> extends Iterable<T>, KMappedMarker {
    start?: number; // 当前页码
    limit?: number; // 每页数量
    total: number;  // 总数量
    hasMore: boolean; // 是否存在下一页
    results: T[]; // 当前页数据
}

// Beans 执行器响应结构
export interface BeansActuatorResponse {
    contexts: { [index: string]: BeansActuatorResponse$Context };
}

// Cache 执行器响应结构
export interface CacheActuatorResponse {
    target: string; // 目标
    name: string; // 名称
    cacheManager: string; // 管理器名称
}

// Caches 执行器响应结构
export interface CachesActuatorResponse {
    cacheManagers: { [index: string]: CachesActuatorResponse$CacheManager };
}

// Config属性 执行器响应结构
export interface ConfigPropsActuatorResponse {
    contexts: { [index: string]: ConfigPropsActuatorResponse$Context };
}

// Endpoints 执行器响应结构
export interface EndpointsActuatorResponse {
    links: { [index: string]: EndpointsActuatorResponse$Link };
    _links: { [index: string]: EndpointsActuatorResponse$Link };
}

// Env 执行器响应结构
export interface EnvActuatorResponse {
    activeProfiles: string[];
    propertySources: EnvActuatorResponse$PropertySource[];
}

// Env属性 执行器响应结构
export interface EnvPropertyActuatorResponse {
    property: EnvPropertyActuatorResponse$Property;
    activeProfiles: string[];
    propertySources: EnvPropertyActuatorResponse$PropertySource[];
}

// Flyway 执行器响应结构
export interface FlywayActuatorResponse {
    contexts: { [index: string]: FlywayActuatorResponse$Context };
}

// Health 执行器响应结构
export interface HealthActuatorResponse {
    status: HealthActuatorResponse$Status;
    components?: { [index: string]: HealthActuatorResponse$Component };
    groups?: string[];
    details?: { [index: string]: any };
}

// Info 执行器响应结构
export interface InfoActuatorResponse {
    build?: InfoActuatorResponse$Build;
    git?: InfoActuatorResponse$Git;
}

// IntegrationGraph 执行器响应结构
export interface IntegrationGraphActuatorResponse {
    contentDescriptor: IntegrationGraphActuatorResponse$ContentDescriptor;
    nodes: IntegrationGraphActuatorResponse$Node[];
    links: IntegrationGraphActuatorResponse$Link[];
}

// Liquibase 执行器响应结构
export interface LiquibaseActuatorResponse {
    contexts: { [index: string]: LiquibaseActuatorResponse$Context };
}

// Logger 执行器响应结构
export interface LoggerActuatorResponse {
    effectiveLevel?: string;
    configuredLevel?: string;
    members?: string[];
}

// Logger 更新请求
export interface LoggerUpdateRequest {
    configuredLevel?: string; // 设置日志级别
}

// Loggers 执行器响应请求
export interface LoggersActuatorResponse {
    levels: string[];
    loggers: { [index: string]: LoggersActuatorResponse$Logger };
    groups: { [index: string]: LoggersActuatorResponse$Group };
}

// Mappings 执行器响应请求
export interface MappingsActuatorResponse {
    contexts: { [index: string]: MappingsActuatorResponse$Context };
}

// Metric 执行器响应结构
export interface MetricActuatorResponse {
    name: string;
    description?: string;
    baseUnit?: string;
    availableTags: MetricActuatorResponse$Tag[];
    measurements: MetricActuatorResponse$Measurement[];
}

// Metrics 执行器响应结构
export interface MetricsActuatorResponse {
    names: string[];
}

// Quartz 执行器响应结构
export interface QuartzActuatorResponse {
    jobs: QuartzActuatorResponse$JobsOrTriggers;
    triggers: QuartzActuatorResponse$JobsOrTriggers;
}

// Quartz 任务响应结构
export interface QuartzJobResponse {
    group: string;
    name: string;
    description: string;
    className: string;
    durable: boolean;
    requestRecovery: boolean;
    data: { [index: string]: any };
    triggers: QuartzJobResponse$Trigger[];
}

// Quartz 任务分组响应
export interface QuartzJobsByGroupResponse {
    group: string;
    jobs: { [index: string]: QuartzJobsByGroupResponse$Job };
}

// Quartz 任务列表响应
export interface QuartzJobsResponse {
    groups: { [index: string]: QuartzJobsResponse$Group };
}

// Quartz 触发器响应
export interface QuartzTriggerResponse {
    group: string;
    name: string;
    description: string;
    state: string;
    type: string;
    calendarName?: string;
    startTime?: ParsedDate;
    endTime?: ParsedDate;
    previousFireTime?: ParsedDate;
    nextFireTime?: ParsedDate;
    priority: number;
    finalFireTime?: ParsedDate;
    data?: { [index: string]: any };
    calendarInterval?: QuartzTriggerResponse$CalendarInterval;
    custom?: QuartzTriggerResponse$Custom;
    cron?: QuartzTriggerResponse$Cron;
    dailyTimeInterval?: QuartzTriggerResponse$DailyTimeInterval;
    simple?: QuartzTriggerResponse$Simple;
}

// Quartz 触发器分组响应结构
export interface QuartzTriggersByGroupResponse {
    group: string;
    paused: boolean;
    triggers: QuartzTriggersByGroupResponse$Triggers;
}

// Quartz 触发器列表响应结构
export interface QuartzTriggersResponse {
    groups: { [index: string]: QuartzTriggersResponse$Group };
}

// 调度任务 执行器响应结构
export interface ScheduledTasksActuatorResponse {
    cron: ScheduledTasksActuatorResponse$Cron[];
    fixedDelay: ScheduledTasksActuatorResponse$FixedDelayOrRate[];
    fixedRate: ScheduledTasksActuatorResponse$FixedDelayOrRate[];
    custom: ScheduledTasksActuatorResponse$Custom[];
}

// 测试连接 响应结构
export interface TestConnectionResponse {
    statusCode: number;
    statusText?: string;
    validActuator: boolean;
    success: boolean;
}

// 线程快照 执行器响应结构
export interface ThreadDumpActuatorResponse {
    threads: ThreadDumpActuatorResponse$Thread[];
}

// Togglz 功能执行器响应结构
export interface TogglzFeatureActuatorResponse {
    name: string;
    enabled: boolean;
    strategy?: string;
    params?: { [index: string]: string | undefined };
    metadata?: TogglzFeatureActuatorResponse$Metadata;
}

// Togglz 功能更新请求
export interface TogglzFeatureUpdateRequest {
    name: string;
    enabled: boolean;
}

// 查询数量 返回对象
export interface CountResultRO {
    total: number;
}

// 应用缓存 返回对象
export interface ApplicationCacheRO {
    name: string;
    cacheManager: string;
    target: string;
}

// 应用缓存统计数据 返回对象
export interface ApplicationCacheStatisticsRO {
    gets: number;
    puts: number;
    evictions: number;
    hits: number;
    misses: number;
    removals: number;
    size: number;
}

// 请求应用缓存结果 返回对象
export interface EvictApplicationCachesResultRO {
    summaries: { [index: string]: ResultAggregationSummary<Unit> };
    status: ResultAggregationSummary$Status;
}

// 应用日志 返回对象
export interface ApplicationLoggerRO {
    name: string;
    loggers: { [index: string]: InstanceLoggerRO };
}

// 应用健康 返回对象
export interface ApplicationHealthRO {
    applicationId: string;
    status: ApplicationHealthStatus;
    lastUpdateTime: DateAsNumber;
    lastStatusChangeTime: DateAsNumber;
}

// 应用变更请求 返回对象
export interface ApplicationModifyRequestRO {
    alias: string;
    type: ApplicationType;
    color: string;
    authentication: Authentication;
    description?: string;
    icon?: string;
    sort?: number;
    parentFolderId?: string;
    disableSslVerification?: boolean;
}

// 应用 返回对象
export interface ApplicationRO {
    id: string;
    alias: string;
    type: ApplicationType;
    instanceCount: number;
    description?: string;
    color: string;
    icon?: string;
    sort?: number;
    parentFolderId?: string;
    health: ApplicationHealthRO;
    authentication: Authentication;
    demo: boolean;
    disableSslVerification: boolean;
}

// 文件夹编辑请求 返回对象
export interface FolderModifyRequestRO {
    alias: string;
    color: string;
    authentication: Authentication;
    description?: string;
    icon?: string;
    sort?: number;
    parentFolderId?: string;
}

// 文件夹 返回对象
export interface FolderRO {
    id: string;
    alias: string;
    description?: string;
    color: string;
    icon?: string;
    sort?: number;
    parentFolderId?: string;
    authentication: Authentication;
}

// 清理缓存请求 返回对象
export interface EvictCachesRequestRO {
    cacheNames: string[];
}

// 实例缓存 返回对象
export interface InstanceCacheRO {
    name: string;
    cacheManager: string;
    target: string;
}

// 实例缓存统计数据 返回对象
export interface InstanceCacheStatisticsRO {
    gets: number;
    puts: number;
    evictions: number;
    hits: number;
    misses: number;
    removals: number;
    size: number;
}

// 实例健康 返回对象
export interface InstanceHealthRO {
    instanceId: string;
    status: InstanceHealthStatus;
    statusText?: string;
    lastUpdateTime: DateAsNumber;
    lastStatusChangeTime: DateAsNumber;
    statusCode?: number;
}

// 实例堆快照引用 返回对象
export interface InstanceHeapdumpReferenceRO {
    id: string;
    instanceId: string;
    creationTime: DateAsNumber;
    status: InstanceHeapdumpReference$Status;
    path?: string;
    size?: number;
    error?: string;
}

// 实例Http请求统计数据 返回对象
export interface InstanceHttpRequestStatisticsRO {
    uri: string; // 请求路径
    count: number; // 请求数
    totalTime: number; // 累计请求耗时
    max: number; // 最大耗时
}

// 实例日志 返回对象
export interface InstanceLoggerRO {
    name: string;
    effectiveLevel?: string;
    configuredLevel?: string;
}

// 实例统计数据 返回对象
export interface InstanceMetricRO {
    name: string;
    description?: string;
    unit?: string;
    value: InstanceMetricValueRO;
}

// 实例统计数据值 返回对象
export interface InstanceMetricValueRO {
    value: number;
    timestamp: DateAsNumber;
}

// 实例属性 返回对象
export interface InstancePropertyRO {
    contexts: { [index: string]: { [index: string]: any } };
    redactionLevel: InstancePropertyRO$RedactionLevel;
}

// 实例编辑请求 返回对象
export interface InstanceModifyRequestRO {
    alias?: string;
    actuatorUrl: string;
    parentApplicationId: string;
    color: string;
    description?: string;
    icon?: string;
    sort?: number;
}

// 实例 返回对象
export interface InstanceRO {
    id: string;
    hostname?: string;
    alias?: string;
    actuatorUrl: string;
    parentApplicationId: string;
    description?: string;
    color: string;
    icon?: string;
    sort?: number;
    health: InstanceHealthRO;
    demo: boolean;
}

// 实例系统环境变量 返回对象
export interface InstanceSystemEnvironmentRO {
    properties: { [index: string]: string };
    redactionLevel: InstanceSystemEnvironmentRO$RedactionLevel;
}

// 实例系统属性 返回对象
export interface InstanceSystemPropertiesRO {
    properties: { [index: string]: string };
    redactionLevel: InstanceSystemPropertiesRO$RedactionLevel;
}

// 事件日志 返回对象
export interface EventLogRO {
    id: string;
    creationTime: DateAsNumber;
    type: EventLogType;
    severity: EventLogSeverity;
    targetId: string;
    message?: string;
}

// 线程分析 返回对象
export interface ThreadProfilingLogRO {
    id: string;
    creationTime: DateAsNumber;
    requestId: string;
    threads: ThreadDumpActuatorResponse$Thread[];
}

// 线程分析请求创建 返回对象
export interface ThreadProfilingRequestCreateRO {
    instanceId: string;
    durationSec: number;
}

// 线程分析请求 返回对象
export interface ThreadProfilingRequestRO {
    id: string;
    creationTime: DateAsNumber;
    instanceId: string;
    durationSec: number;
    finishTime: DateAsNumber;
    status: ThreadProfilingStatus;
}

// 应用健康更新时间消息 载荷
export interface ApplicationHealthUpdatedEventMessage$Payload {
    applicationId: string;
    newHealth: ApplicationHealthRO;
}

// 有效的授权
export interface EffectiveAuthentication {
    authentication: Authentication;
    sourceType: EffectiveAuthentication$SourceType;
    sourceId: string;
}

// 实例线程快照下载进程信息 载荷
export interface InstanceHeapdumpDownloadProgressMessage$Payload {
    referenceId: string;
    instanceId: string;
    bytesRead: number;
    contentLength: number;
    status: InstanceHeapdumpReference$Status;
    error?: string;
}

// 实例能力刷新事件消息 载荷
export interface InstanceAbilitiesRefreshedEventMessage$Payload {
    parentApplicationId: string;
    instanceId: string;
    abilities: InstanceAbility[];
}

// 实例健康变更事件消息 载荷
export interface InstanceHealthChangedEventMessage$Payload {
    parentApplicationId: string;
    instanceId: string;
    oldHealth: InstanceHealthRO;
    newHealth: InstanceHealthRO;
}

// 实例健康检查操作事件消息 载荷
export interface InstanceHealthCheckPerformedEventMessage$Payload {
    parentApplicationId: string;
    instanceId: string;
    oldHealth: InstanceHealthRO;
    newHealth: InstanceHealthRO;
}

// 实例主机名更新时间消息 载荷
export interface InstanceHostnameUpdatedEventMessage$Payload {
    instanceId: string;
    hostname?: string;
}

// 线程分析进度消息 载荷
export interface ThreadProfilingProgressMessage$Payload {
    requestId: string;
    instanceId: string;
    secondsRemaining: number;
    status: ThreadProfilingStatus;
}

// 结果聚合摘要
export interface ResultAggregationSummary<T> {
    totalCount: number;
    successCount: number;
    failureCount: number;
    errors: (string | undefined)[];
    status: ResultAggregationSummary$Status;
}

// 订单 DTO
export interface OrderDTO {
    by?: string;
    descending: boolean;
}

// 过滤器字段
export interface FilterField {
    fieldName: string;
    operation: FilterFieldOperation;
    dataType: FilterFieldDataType;
    enumType: string;
    values: any[];
    children: FilterField[];
}

export interface KMappedMarker {
}

// Beans 执行器响应 上下文
export interface BeansActuatorResponse$Context {
    beans: { [index: string]: BeansActuatorResponse$Context$Bean };
    parentId?: string;
}

// Caches 执行器响应 缓存管理器
export interface CachesActuatorResponse$CacheManager {
    caches: { [index: string]: CachesActuatorResponse$CacheManager$Cache };
}

// Config属性 执行器响应 上下文
export interface ConfigPropsActuatorResponse$Context {
    beans: { [index: string]: ConfigPropsActuatorResponse$Context$Bean };
    parentId?: string;
}

// Endpoints 执行器响应 连接
export interface EndpointsActuatorResponse$Link {
    href: string;
    templated: boolean;
}

// Env 执行器响应 属性源
export interface EnvActuatorResponse$PropertySource {
    name: string;
    properties?: { [index: string]: EnvActuatorResponse$PropertySource$Property };
}

// Env属性 执行器响应 属性
export interface EnvPropertyActuatorResponse$Property {
    value: string;
    source: string;
}

// Env属性 执行器响应 属性源
export interface EnvPropertyActuatorResponse$PropertySource {
    name: string;
    property?: EnvPropertyActuatorResponse$PropertySource$Property;
}

// Flyway 执行器响应 上下文
export interface FlywayActuatorResponse$Context {
    flywayBeans: { [index: string]: FlywayActuatorResponse$Context$FlywayBean };
    parentId?: string;
}

// Health 执行器响应 上下文
export interface HealthActuatorResponse$Component {
    status: HealthActuatorResponse$Status;
    description?: string;
    components?: { [index: string]: HealthActuatorResponse$Component };
    details?: { [index: string]: any };
}

// Info 执行器响应 构建
export interface InfoActuatorResponse$Build {
    artifact: string;
    group: string;
    name: string;
    version: string;
    time?: ParsedDate;
}

// Info 执行器响应 Git
export interface InfoActuatorResponse$Git {
    branch: string;
    commit: InfoActuatorResponse$Git$Commit;
}

// IntegrationGraph 执行器响应 上下文描述符
export interface IntegrationGraphActuatorResponse$ContentDescriptor {
    providerVersion: string;
    providerFormatVersion: number;
    provider: string;
    name?: string;
}

// IntegrationGraph 执行器响应 节点
export interface IntegrationGraphActuatorResponse$Node {
    nodeId: number;
    componentType: string;
    integrationPatternType: string;
    integrationPatternCategory: string;
    properties: { [index: string]: string };
    sendTimers?: { [index: string]: IntegrationGraphActuatorResponse$Node$SendTimer };
    receiveCounters?: { [index: string]: number };
    name: string;
    input?: string;
    output?: string;
    errors?: string;
    discards?: string;
    routes?: string[];
}

// IntegrationGraph 执行器响应 连接
export interface IntegrationGraphActuatorResponse$Link {
    from: number;
    to: number;
    type: string;
}

// Liquibase 执行器响应 上下文
export interface LiquibaseActuatorResponse$Context {
    liquibaseBeans: { [index: string]: LiquibaseActuatorResponse$Context$LiquibaseBean };
    parentId?: string;
}

export interface LoggersActuatorResponse$Logger {
    effectiveLevel: string;
    configuredLevel?: string;
}

// Loggers 执行器响应 分组
export interface LoggersActuatorResponse$Group {
    configuredLevel?: string;
    members: string[];
}

// Mappings 执行器响应 上下文
export interface MappingsActuatorResponse$Context {
    mappings: MappingsActuatorResponse$Context$Mappings;
    parentId?: string;
}

// Metric 执行器响应 标签
export interface MetricActuatorResponse$Tag {
    tag: string;
    values: string[];
}

// Metric 执行器响应 尺寸
export interface MetricActuatorResponse$Measurement {
    statistic: string;
    value: number;
}

// Quartz 执行器响应 任务列表或触发器列表
export interface QuartzActuatorResponse$JobsOrTriggers {
    groups: string[];
}

// Quartz 执行器响应 触发器
export interface QuartzJobResponse$Trigger {
    group: string;
    name: string;
    previousFireTime?: ParsedDate;
    nextFireTime?: ParsedDate;
    priority: number;
}

// Quartz 任务分组响应 任务
export interface QuartzJobsByGroupResponse$Job {
    className: string;
}

// Quartz 任务分组响应 分组
export interface QuartzJobsResponse$Group {
    jobs: string[];
}

// 解析日期
export interface ParsedDate {
    date?: DateAsNumber;
    original?: string;
}

export interface QuartzTriggerResponse$CalendarInterval {
    interval: number;
    timeZone: string;
    timesTriggered: number;
    preserveHourOfDayAcrossDaylightSavings: boolean;
    skipDayIfHourDoesNotExist: boolean;
}

// Quartz 触发器响应 自定义
export interface QuartzTriggerResponse$Custom {
    trigger: string;
}

// Quartz 触发器响应 计划
export interface QuartzTriggerResponse$Cron {
    expression: string;
    timeZone: string;
}

// Quartz 触发器响应 每日时间间隔
export interface QuartzTriggerResponse$DailyTimeInterval {
    interval: number;
    daysOfWeek: number[];
    startTimeOfDay: string;
    endTimeOfDay: string;
    repeatCount: number;
    timesTriggered: number;
}

// Quartz 触发器响应 简单
export interface QuartzTriggerResponse$Simple {
    interval: number;
    repeatCount: number;
    timesTriggered: number;
}

// Quartz 触发器分组响应 触发器
export interface QuartzTriggersByGroupResponse$Triggers {
    cron: { [index: string]: QuartzTriggersByGroupResponse$Cron };
    simple: { [index: string]: QuartzTriggersByGroupResponse$Simple };
    dailyTimeInterval: { [index: string]: QuartzTriggersByGroupResponse$DailyTimeInterval };
    calendarInterval: { [index: string]: QuartzTriggersByGroupResponse$CalendarInterval };
    custom: { [index: string]: QuartzTriggersByGroupResponse$Custom };
}

// Quartz 触发器响应 分组
export interface QuartzTriggersResponse$Group {
    paused: boolean;
    triggers: string[];
}

// ScheduledTasks 执行器响应 计划
export interface ScheduledTasksActuatorResponse$Cron {
    runnable: ScheduledTasksActuatorResponse$Runnable;
    expression: string;
}

// ScheduledTasks 执行器响应 固定触发或频率
export interface ScheduledTasksActuatorResponse$FixedDelayOrRate {
    runnable: ScheduledTasksActuatorResponse$Runnable;
    initialDelay: number;
    interval: number;
}

// ScheduledTasks 执行器响应 自定义
export interface ScheduledTasksActuatorResponse$Custom {
    runnable: ScheduledTasksActuatorResponse$Runnable;
    trigger: string;
}

// 线程快照 执行器响应 线程
export interface ThreadDumpActuatorResponse$Thread {
    threadName: string;
    threadId: number;
    blockedTime: number;
    blockedCount: number;
    waitedTime: number;
    waitedCount: number;
    lockName?: string;
    lockOwnerId: number;
    lockOwnerName?: string;
    daemon: boolean;
    inNative: boolean;
    suspended: boolean;
    threadState: string;
    priority: number;
    stackTrace: ThreadDumpActuatorResponse$Thread$StackTraceFrame[];
    lockedMonitors: ThreadDumpActuatorResponse$Thread$LockedMonitor[];
    lockedSynchronizers: ThreadDumpActuatorResponse$Thread$LockedSynchronizer[];
    lockInfo?: ThreadDumpActuatorResponse$Thread$LockInfo;
}

// TogglzFeature 执行器响应 元数据
export interface TogglzFeatureActuatorResponse$Metadata {
    label: string;
    groups: string[];
    enabledByDefault: boolean;
    attributes?: { [index: string]: string | undefined };
}

export interface Unit {
}

export interface Authentication {
}

export interface Iterable<T> {
}

// Beans 执行器响应 上下文 Bean
export interface BeansActuatorResponse$Context$Bean {
    aliases: string[];
    scope: string;
    type: string;
    resource?: string;
    dependencies: string[];
}

// Caches 执行器响应 缓存管理器 缓存
export interface CachesActuatorResponse$CacheManager$Cache {
    target: string;
}

// ConfigProps 执行器响应 上下文 Bean
export interface ConfigPropsActuatorResponse$Context$Bean {
    prefix?: string;
    properties?: { [index: string]: any };
    inputs?: { [index: string]: any };
}

// Env 执行器响应 属性源 属性
export interface EnvActuatorResponse$PropertySource$Property {
    value: string;
    origin?: string;
}

// EnvProperty 执行器响应 属性源 属性
export interface EnvPropertyActuatorResponse$PropertySource$Property {
    value: string;
    origin?: string;
}

// Flyway 执行器响应 上下文 FlywayBean
export interface FlywayActuatorResponse$Context$FlywayBean {
    migrations: FlywayActuatorResponse$Context$FlywayBean$Migration[];
}

// Info 执行器响应 Git 提交
export interface InfoActuatorResponse$Git$Commit {
    id: string;
    time?: ParsedDate;
}

// IntegrationGraph 执行器响应 节点 发送定时器
export interface IntegrationGraphActuatorResponse$Node$SendTimer {
    count: number;
    mean: number;
    max: number;
}

// Liquibase 执行器响应 上下文 LiquebaseBean
export interface LiquibaseActuatorResponse$Context$LiquibaseBean {
    changeSets: LiquibaseActuatorResponse$Context$LiquibaseBean$ChangeSet[];
}

// Mappings 执行器响应 上下文 映射
export interface MappingsActuatorResponse$Context$Mappings {
    dispatcherServlets?: { [index: string]: MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler[] };
    servletFilters: MappingsActuatorResponse$Context$Mappings$ServletFilter[];
    servlets: MappingsActuatorResponse$Context$Mappings$Servlet[];
    dispatcherHandlers?: { [index: string]: MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler[] };
}

// Quartz 分组后的触发器响应 计划
export interface QuartzTriggersByGroupResponse$Cron {
    previousFireTime?: ParsedDate;
    nextFireTime?: ParsedDate;
    priority: number;
    expression: string;
    timeZone: string;
}

// Quartz 分组后的触发器 简单
export interface QuartzTriggersByGroupResponse$Simple {
    previousFireTime?: ParsedDate;
    nextFireTime?: ParsedDate;
    priority: number;
    interval: number;
}

// Quartz 分组后的触发器 响应 每日时间间隔
export interface QuartzTriggersByGroupResponse$DailyTimeInterval {
    previousFireTime?: ParsedDate;
    nextFireTime?: ParsedDate;
    priority: number;
    interval: number;
    daysOfWeek: string[];
    startTimeOfDay: string;
    endTimeOfDay: string;
}

// Quartz 分组后的触发器 响应 日历间隔
export interface QuartzTriggersByGroupResponse$CalendarInterval {
    previousFireTime?: ParsedDate;
    nextFireTime?: ParsedDate;
    priority: number;
    interval: number;
    timeZone: string;
}

// Quartz 分组后的触发器 响应 自定义
export interface QuartzTriggersByGroupResponse$Custom {
    previousFireTime?: ParsedDate;
    nextFireTime?: ParsedDate;
    priority: number;
    trigger: string;
}

// ScheduledTasks 执行器响应 可执行
export interface ScheduledTasksActuatorResponse$Runnable {
    target: string;
}

// 线程快照 执行器 响应 线程 堆栈帧
export interface ThreadDumpActuatorResponse$Thread$StackTraceFrame {
    classLoaderName?: string;
    moduleName?: string;
    moduleVersion?: string;
    fileName?: string;
    className?: string;
    methodName?: string;
    lineNumber: number;
    nativeMethod: boolean;
}

// 线程快照 执行器 响应 线程 锁监控
export interface ThreadDumpActuatorResponse$Thread$LockedMonitor {
    className?: string;
    identityHashCode: number;
    lockedStackDepth: number;
    lockedStackFrame: ThreadDumpActuatorResponse$Thread$StackTraceFrame;
}

// 线程快照 执行器 响应 线程 锁同步器
export interface ThreadDumpActuatorResponse$Thread$LockedSynchronizer {
    className?: string;
    identityHashCode: number;
}

// 线程快照 执行器 响应 线程 锁信息
export interface ThreadDumpActuatorResponse$Thread$LockInfo {
    className?: string;
    identityHashCode: number;
}

// 权限 节点
export interface Authentication$None extends Authentication {
    type: string;
}

// 权限 层级
export interface Authentication$Inherit extends Authentication {
    type: string;
}

// 权限 基础
export interface Authentication$Basic extends Authentication {
    username: string;
    password: string;
    type: string;
}

// 权限 头
export interface Authentication$Header extends Authentication {
    headerName: string;
    headerValue: string;
    type: string;
}

// 权限 查询字符串
export interface Authentication$QueryString extends Authentication {
    key: string;
    value: string;
    type: string;
}

// 权限 不记名令牌
export interface Authentication$BearerToken extends Authentication {
    token: string;
    type: string;
}

// Flyway 执行器 响应 上下文 FlywayBean 移民
export interface FlywayActuatorResponse$Context$FlywayBean$Migration {
    type: string;
    checksum: number;
    version?: string;
    description: string;
    script: string;
    state: string;
    installedBy: string;
    installedOn: ParsedDate;
    installedRank: number;
    executionTime: number;
}

// Liquibase 执行器 响应 上下文 LiquibaseBean 变化集
export interface LiquibaseActuatorResponse$Context$LiquibaseBean$ChangeSet {
    id: string;
    checksum: string;
    orderExecuted: number;
    author: string;
    changeLog: string;
    comments: string;
    contexts: string[];
    dateExecuted: ParsedDate;
    deploymentId: string;
    description: string;
    execType: string;
    labels: string[];
    tag?: string;
}

// Mappings 执行器 响应 上下文 映射 转发器
export interface MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler {
    handler: string; // 转发器名称
    predicate: string; // 转发器条件
    details?: MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details; // 转发器细节
}

// Mappings 执行器 响应 上下文 映射 Servlet 过滤器
export interface MappingsActuatorResponse$Context$Mappings$ServletFilter {
    servletNameMappings: string[]; // servlet 名称映射数组
    urlPatternMappings: string[]; // URL 模式匹配
    name: string; // 过滤器名称
    className: string; // 过滤器类名
}

// Mappings 执行器 响应 上下文 映射 Servlet
export interface MappingsActuatorResponse$Context$Mappings$Servlet {
    mappings: string[]; // 映射数组
    name: string; // 名称
    className: string; // 处理类名
}

// Mapping 执行器 响应 上下文 映射 转发器 细节
export interface MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details {
    handlerMethod?: MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$HandlerMethod; //  处理方法
    handlerFunction?: MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$HandlerFunction; // 处理函数
    requestMappingConditions?: MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$RequestMappingConditions; // 请求映射条件
}

// Mappings 执行器 响应 上下文 映射 转发器 细节 处理方法
export interface MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$HandlerMethod {
    className: string; // 处理类名
    name: string; // 方法名
    descriptor: string; // 描述
}

// Mappings 执行器 响应 上下文 映射 转发器 细节 处理器
export interface MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$HandlerFunction {
    className: string; // 处理类名
}

// Mappings 执行器 响应 上下文 映射 转发器 细节 请求映射条件
export interface MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$RequestMappingConditions {
    // 请求接受的文件类型
    consumes: MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$RequestMappingConditions$MediaType[];
    // 请求头
    headers: MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$RequestMappingConditions$Header[];
    // 请求方法
    methods: string[];
    // 请求参数
    params: MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$RequestMappingConditions$Param[];
    // 匹配模式
    patterns: string[];
    // 请求传递的文件类型
    produces: MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$RequestMappingConditions$MediaType[];
}

// Mappings 执行器 响应 上下文 映射 转发器 细节 请求映射条件 文件类型
export interface MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$RequestMappingConditions$MediaType {
    mediaType: string;
    negated: boolean;
}

// Mappings 执行器 响应 上下文 映射 转发器 细节 请求映射条件 请求头
export interface MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$RequestMappingConditions$Header {
    name: string;
    value: string;
}

// Mappings 执行器 响应 上下文 映射 转发器 细节 请求映射条件 参数
export interface MappingsActuatorResponse$Context$Mappings$DispatcherServletOrHandler$Details$RequestMappingConditions$Param {
    name: string;
    value: string;
}

// 日期类型(时间戳)
export type DateAsNumber = number;

// 实例具备的能力
export type InstanceAbility = "METRICS" | "ENV" | "BEANS" | "QUARTZ" | "FLYWAY" | "LIQUIBASE" | "LOGGERS" | "CACHES" | "THREADDUMP" | "HEAPDUMP" | "CACHE_STATISTICS" | "SHUTDOWN" | "REFRESH" | "HTTP_REQUEST_STATISTICS" | "INTEGRATIONGRAPH" | "PROPERTIES" | "MAPPINGS" | "SCHEDULEDTASKS" | "HEALTH" | "INFO" | "SYSTEM_PROPERTIES" | "SYSTEM_ENVIRONMENT" | "TOGGLZ";

// 健康 执行器 响应 状态
export type HealthActuatorResponse$Status = "UP" | "DOWN" | "OUT_OF_SERVICE" | "UNKNOWN";

// 结果 聚合 摘要 状态
export type ResultAggregationSummary$Status = "SUCCESS" | "PARTIAL_SUCCESS" | "FAILURE";

// 应用健康状态
export type ApplicationHealthStatus = "ALL_UP" | "ALL_DOWN" | "SOME_DOWN" | "UNKNOWN" | "PENDING" | "EMPTY";

// 应用类型
export type ApplicationType = "SPRING_BOOT";

// 实例健康 状态
export type InstanceHealthStatus = "UP" | "DOWN" | "UNKNOWN" | "OUT_OF_SERVICE" | "UNREACHABLE" | "PENDING" | "INVALID";

// 实例线程快照引用 状态
export type InstanceHeapdumpReference$Status = "PENDING_DOWNLOAD" | "DOWNLOADING" | "READY" | "FAILED";

// 实例属性返回对象 编辑级别
export type InstancePropertyRO$RedactionLevel = "NONE" | "PARTIAL" | "FULL";

// 实例系统环境返回对象 编辑级别
export type InstanceSystemEnvironmentRO$RedactionLevel = "NONE" | "PARTIAL" | "FULL";

// 实例系统属性返回对象 编辑级别
export type InstanceSystemPropertiesRO$RedactionLevel = "NONE" | "PARTIAL" | "FULL";

// 事件日志类型
export type EventLogType = "INSTANCE_HEALTH_CHANGED";

// 事件日志严重性
export type EventLogSeverity = "INFO" | "WARN" | "ERROR";

// 线程分析状态
export type ThreadProfilingStatus = "RUNNING" | "FINISHED";

// 有效性认证 源类型
export type EffectiveAuthentication$SourceType = "FOLDER" | "APPLICATION";

// 过滤字段支持的操作
export type FilterFieldOperation = "Equal" | "NotEqual" | "In" | "NotIn" | "GreaterThan" | "GreaterEqual" | "LowerThan" | "LowerEqual" | "Between" | "Contains" | "IsNull" | "IsNotNull" | "IsEmpty" | "IsNotEmpty" | "And" | "Or" | "Not" | "Noop";

// 过滤字段支持的日期类型
export type FilterFieldDataType = "String" | "Integer" | "Long" | "Double" | "Boolean" | "Date" | "Object" | "Enum" | "UUID" | "None";
