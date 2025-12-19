# Endpoint Loggers

## 用途

用于展示 `/actuator/loggers` 的日志配置信息，并且可变更日志级别。

## 架构

### 页面展示

`app/src/renderer/components/item/logger`

### 核心逻辑

`TableCellDataInstanceLoggerLevel`

输入：
- `row` 当前行的数据
- `column` 当前列

中间：
- `loadingLevels` 在用户点击某个日志级别时，记录该级别，在页面上的效果是显示`哪个按钮正在loading`
- `disabled` 只要`loadingLevels`有值，就禁用，防止用户无限点击
- `setLevelState` 执行更新日志级别的的请求封装
- `changeHandler` 用户选择日志级别时触发的主逻辑
- `effectiveLevels` 生效的日志级别
- `configuredLevels` 配置的日志级别

`LogLevelToggleGroupProps`

输入：
- `configuredLevels`
- `effectiveLevels`
- `loadingLevels`
- `disabled`
- `onChange`

中间：
- `customLogLevel` 自定义的日志级别，CUSTOM
- `logLevels` 日志组件的按钮列表
- `customLogLevelValue` 如果传入的是非标准值，则找出来展示
- `value`  
- `changeHandler` 变更日志级别触发的逻辑，主要增加了 CUSTOM 时弹窗配置的逻辑
- `getColor` 给不同 Level 设置不同的颜色
