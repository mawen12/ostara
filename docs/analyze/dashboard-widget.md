# Dashboard Widget

提供多种的数据图表展示功能：
- `progress-circle`
- `percent-circle`
- `stacked-timeline`
- `data-bar`
- `countdown`
- `health-status`

展示载体为：`Card`

底层的图标组件库为：`ApexCharts`

## HealthStatusDashboardWidget

输入：
- Wiget：名称
- item：元素信息

中间：
- healthStatusColor
- healthTextId
- loading

展示对应健康状态的问题内容，支持loading

## NotSupportedDashboardWidget

展示不支持组件的报错。

## CountdownDashboardWidget

输入：
- widget：名称，指标
- item：元素ID

中间：
- data: 来源于订阅的指标信息，从后台通过stomp和http获取指标信息
- loading: 没有data
- seconds: data.value.value

本质上是定时读取信息，比如应用的启动时长信息,`process.uptime`。

底层基于 `CountdownValue` 展示。

## ProgressCircleDashboardWidget

输入：
- widget：名称，颜色，当前指标名称，最大指标名称
- item：元素ID

中间：
- percent: 展示当前指标/最大指标的值

本质上展示了进度信息。比如 `jvm.memory.used`, `jvm.memory.max`, `disk.free`, `disk.total`。在中间展示名称和百分比

## PercentCircleDashboardWidget

输入：
- widget：名称，颜色，指标名称
- item：元素ID

中间：
- percent: 展示指标处理后的值


本质上展示了进度信息。对比 `ProgressCircleDashboardWidget` 的区别在于，其没有最大值的概念。或者最大值是固定的，比如 `process.cpu.usage`。而 `ProgressCircleDashboardWidget` 是通过计算当前/最大值来获得结果的。

## StackedTimelineDashboardWidget

输入：
- widget：名称，颜色，指标列表
- item：元素ID
- intervalSeconds: 间隔

中间：
- data: 指标值集合
- chartLabels： 名称

本质上是持续的使用进度展示信息。比如：`jvm.threads.live`, `jvm.threads.daemon`, `jvm.memory.used`, `jvm.memory.committed`

## DataBarDashboardWidget

输入：
- widget：名称，颜色，指标列表
- item：元素ID

中间：
- data: 一组持续的指标集合

本质上是持续的使用进度展示信息，比如： `process.uptime`， `process.cpu.usage`， `system.cpu.count`
