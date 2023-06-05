# @krud-dev/ostara-main

## 0.9.0

### Minor Changes 小改动

- 26211c7: Added manual app updates mechanism
- 3a04b8b: Added ability to disable SSL verification for applications
- 18b5f69: Added Togglz support
- 2b6508e: Added analytics heartbeat and additional demo events

- 26211c7: 添加了手动更新程序的机制
- 3a04b8b: 添加了禁用应用程序 SSL 验证的功能
- 18b5f69: 添加了切换支持
- 2b6508e: 添加了分析心跳和其他演示事件


### Patch Changes 主要改动

- c23fa41: Fixed demo application not opened on start
- 7d0e0e0: Fixed dashboard metric error handling
- 58b2df7: Fixed global api error handler invalid app rerenders

- c23fa41: 修复了启动时未启动 demo 应用的问题
- 7d0e0e0: 修复了指标面板错误处理的问题
- 58b2df7: 修复了程序未能正确展示全局 api 错误处理

## 0.8.0

### Minor Changes 小改动

- 1ed0b79: Added in-app demo
- 78106d6: Deep sort app properties keys alphabetically

- 1ed0b79: 添加内置的 demo
- 78106d6: 按字母顺序对应用属性键进行深度排序

### Patch Changes 主要改动

- 70fe8ca: Add missing pattern nullcheck to the multi date deserializer
- 5d7cfd2: Fixed grid text line break mid-word

- 70fe8ca: 为多日期反序列化器添加缺失模式的空检查
- 5d7cfd2: 修复网格文本换行符中字

## 0.7.0

### Minor Changes 小改动

- debaf31: Added analytics events and disabled analytics in developer mode
- 75551a4: Rename app from Boost to Ostara
- 2614ab0: Added error boundary and user feedback on error

- debaf31: 在开发模式下添加分析事件和禁用分析
- 75551a4: 将应用从 Boost 重命名为 Ostara
- 2614ab0: 添加了错误边界和用户反馈错误入口

## 0.6.1

### Patch Changes 主要改动

- 43dc6f6: Added signature for x64 native sqlite library for mac

- 43dc6f6: 为 mac 的 x64 本地 sqllite 库添加签名

## 0.6.0

### Minor Changes 小改动

- e3b5ce7: Added empty state to thread/heap dump tables
- e7819fb: Added loading state to log level toggle
- d9df5fe: Added redaction warning for masked actuator response

- e3b5ce7: 向线程/堆存储表添加空状态
- e7819fb: 将加载状态添加到日志级别切换
- d9df5fe: 添加了屏蔽执行器响应的编辑警告

### Patch Changes 主要改动

- 8ace76b: Fixed analytics implementation with amplitude
- d3261ac: Fixed heapdump download in MacOS
- 7cc135d: Add default values to all fields in actuator responses

- 8ace76b: 修复具有振幅的分析实现
- d3261ac: 修复了MacOS中的堆转储下载
- 7cc135d: 将默认值添加到执行器响应中的所有字段

## 0.5.0

### Minor Changes 小改动

- 789d2e0: Added app version updated dialog
- b67f7b4: Added default actuator url from clipboard to create instance form

- 789d2e0: 添加了应用程序版本更新对话框
- b67f7b4: 添加爱了来自剪切板的默认执行器的url以创建实例

### Patch Changes 主要改动

- 4e5930e: Fixed thread profiling thread data card ui
- f6849d2: Fixed navbar tooltip doesn't disappear when dragging
- 4384b82: Fixed URL regex not allowing dashes
- 4637100: Fix incorrect non-nullable type for dispatcherServlet in mappings response
- 87d4c87: Fixed update item icon ui
- 2c9ce4f: Fixed disable error reporting in renderer for development
- 31c8b52: Change Http Request Statistics by Statuses to be key by string instead of int
- b1ea44b: Fixed url regex path allowed characters

- 4e5930e: 修复了线程分析线程数据卡片UI
- f6849d2: 修复了导航栏工具提示在拖动时不消失的问题
- 4384b82: 修复了URL正则表达式不允许破折号的问题
- 4637100: 修复了映射响应中 dispatcherServlet 的不正确的非空类型
- 87d4c87: 修复了更新项目图标 UI
- 2c9ce4f: 修复了开发渲染器中禁用错误报告
- 31c8b52: 将 HTTP 请求统计信息更改为字符串而不是 int 的键
- b1ea44b: 修复 url 正则表达式路径允许的字符

## 0.4.3

### Patch Changes 小改动

- 1467cc0: Change update check frequency

- 1467cc0: 更改更新检查频率


## 0.4.2

### Patch Changes 主要改动

- 26a8c3b: Fixed windows icon size

- 26a8c3b: 修复了窗口图标尺寸

## 0.4.1

### Patch Changes 主要改动

- b9094e7: Fix issue with app version not being present in packaged builds

- b9094e7: 修复了打包版本中不存在应用程序版本的问题

## 0.4.0

### Minor Changes 小改动

- 9e83a8e: Added automatic updates control to settings
- 1b92e5f: Added ability error guard for instance dashboard
- 7c8dbc0: Added selected item abilities polling and url ability guard
- d24a8e2: Added ability to control error reporting
- a272589: Added changelog to home with markdown component
- 04eae2f: Added explanation for disabled table row actions

- 9e83a8e: 向设置中添加了自动更新控制
- 1b92e5f: 向实例仪表盘添加了错误能力保护
- 7c8dbc0: 添加了选定的元素轮询和 url 能力守卫
- d24a8e2: 添加了控制错误报告的能力
- a272589: 使用 markdown 组件将更新日志添加到主页
- 04eae2f: 添加了对禁用表行操作的说明

### Patch Changes 主要改动

- f1da682: Fixed application caches add statistics

- f1da682: 修复了应用缓存添加统计信息

## 0.3.0

### Minor Changes 小改动

- f798988: Added app version to splash and settings
- 5524c90: Added a new topic on Websocket for instance ability updates

- f798988: 在启动和设置中添加了应用程序版本
- 5524c90: 在 Websocket 上添加了一个新主题，用于实例能力更新

### Patch Changes 主要改动

- 82f3c91: Fixed thread profiling cell click opens multiple details boxes
- 69ce337: Removed restriction on deleting ongoing thread profilings
- f290f42: Fixed table row/mass/global actions to disable while loading

- 82f3c91: 修复了线程分析单元格点击打开多个详细信息框
- 69ce337: 删除了删除正在进行的线程分析的限制
- f290f42: 修复了表行/批量/全局操作以在加载时禁用

## 0.2.0

### Minor Changes 小改动

- aa109dc: Added help button to open relevant documentation for each page

- aa109dc: 添加了帮助按钮以打开每个页面的相关文档

### Patch Changes 主要改动

- bfef682: Fix incorrect sentry tag on renderer

- bfef682: 修复了渲染器不正确的哨兵标识

## 0.1.0

### Minor Changes 小改动

- f25831d: Added status and remaining time websocket updates to thread profiling requests
- 1efe919: Added the ability to disable Sentry data collection
- d23d27b: Added `anonymizeIp` to Google Analytics

- f25831d: 为线程分析请求添加了状态和剩余时间 websocket 更新
- 1efe919: 添加了禁用哨兵数据收集的功能
- d23d27b: 向谷歌分析添加了 `anonmizeIp`

### Patch Changes 主要改动

- c99c0f4: Improved thread profiling log palette
- fe68bef: Fixed HTTP requests statistics spinner not showing

- c99c0f4: 改进了线程分析日志调色板
- fe68bef: 修复了 HTTP 请求统计微调器未显示的问题
