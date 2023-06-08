# Electron 应用更新

## 工程结构

```

src/infra
├── autoupdate                  -- 自动更新
│   ├── app-dev-update.yml      -- 配置文件       
│   ├── appUpdater.ts           -- 应用更新入口
│   ├── index.ts                -- 暴露 main
│   ├── main.ts                 -- 监听来自 renderer process 的应用更新相关事件
│   ├── renderer.ts             -- 提供给 renderer process 的应用更新操作入口
│   └── types.d.ts              -- 类型文件
├── daemon                      -- 后台守护进程    
│   ├── core
│   │   ├── daemon.ts           -- daemon 顶层接口
│   │   └── restHealthCheckingDaemon.ts -- 具有健康检查的 daemon 实现
│   ├── daemonController.ts     -- 访问 daemon 的入口，提供启停、获取信息等功能
│   ├── index.ts                -- 暴露 main
│   ├── main.ts                 -- 监听来自 renderer process 的获取daemon信息事件
│   ├── packaged
│   │   └── packagedDaemon.ts   -- 自带 daemon
│   ├── remote
│   │   └── remoteDaemon.ts     -- 远程 daemon
│   ├── renderer.ts             -- 提供给 renderer process 的获取daemon信息的接口
│   └── types.d.ts              -- 类型文件
├── demo                        -- demo
│   ├── demoService.ts          -- 操作 demo 的服务类，可以进行启停、获取路径等操作
│   ├── index.ts                -- 暴露 main
│   ├── main.ts                 -- 监听来自 renderer process 的操作demo的事件
│   ├── manager
│   │   ├── demoManager.ts      -- demo 管理类接口
│   │   ├── packagedDemoManager.ts  -- 基于生产环境的 demo 管理实现
│   │   └── stubDemoManager.ts      -- 基于开发环境的 demo 管理实现
│   ├── renderer.ts             -- 提供给 renderer process 操作 demo 的方法
│   └── types.d.ts
├── events                          -- 事件
│   ├── events.ts               -- 不同事件定义
│   └── index.ts                
├── index.ts
├── infra.md                        -- 文档
├── notifications                   -- 通知
│   ├── index.ts
│   ├── main.ts                     -- 通知主类，负责处理来自 renderer.ts 的调用
│   ├── models
│   │   └── notificationInfo.ts     -- 通知消息模型
│   ├── notificationsService.ts     -- 通知服务类，底层
│   ├── renderer.ts                 -- 对外提供给 renderer process 调用，由 main.ts 处理
│   └── types.d.ts                  -- 类型文件
├── rendererUtils
│   ├── index.ts
│   ├── main.ts                     -- 接受来自 renderer.ts 的调用
│   ├── renderer.ts                 -- 对外提供给 renderer process 调用，由 main.ts 处理
│   └── types.d.ts
├── store
│   ├── index.ts
│   ├── main.ts                     -- 接受来自 renderer.ts 的调用，并调用 store.ts 的方法
│   ├── renderer.ts                 -- 对外提供给 renderer process 调用，由 main.ts 处理
│   ├── store.ts                    -- 存储底层实现
│   └── types.d.ts
├── subscriptions               
│   ├── renderer.ts                 -- 对外提供订阅的功能
│   ├── subscriptions.ts            -- 定义订阅的结构
│   └── types.d.ts
├── ui
│   ├── index.ts
│   ├── main.ts                     -- 接受来自 renderer.ts 的调用，并调用 uiService 的方法
│   ├── models
│   │   └── electronTheme.ts        -- 定义主题域模型
│   ├── renderer.ts                 -- 对外提供给 renderer process 调用，由 main.ts 处理
│   ├── types.d.ts
│   └── uiService.ts                -- UI服务底层实现类
└── utils
    └── platform.ts                 -- 平台识别工具类

```