# 应用实体


## 工程结构


```

src/renderer/entity/
├── actions.ts  -- 应用支持的操作集
├── entities    -- 实体包
│   ├── applicationCache.entity.tsx             -- 应用缓存，展示和清理缓存
│   ├── applicationInstance.entity.ts           -- 应用实例，展示实例健康度、更新时间、跳转实例详情的操作
│   ├── applicationLogger.entity.ts             -- 应用日志，展示、设置和重置日志级别
│   ├── folderApplication.entity.ts             -- 文件夹应用，展示应用健康度、更新时间、跳转实例详情的操作
│   ├── instanceBean.entity.ts                  -- 应用实例Bean，Endpoint /beans 存在且可访问，展示、图表关系、详情操作
│   ├── instanceCache.entity.tsx                -- 应用实例缓存，Endpoint /caches
│   ├── instanceEnv.entity.ts                   -- 应用实例环境，Endpoint /env
│   ├── instanceFlywayMigration.entity.ts       -- 实例Flyway集成，Endpoint /flyway 存在且可访问
│   ├── instanceHeapdumpReferences.entity.tsx   -- Endpoint /threaddump 存在且可访问 
│   ├── instanceHttpRequest.entity.ts           
│   ├── instanceLiquibaseChangeSetEntity.ts
│   ├── instanceLogger.entity.ts                -- Endpoint /loggers 存在且可访问
│   ├── instanceMappingsDispatcherServletOrHandlerEntity.ts
│   ├── instanceMappingsServletEntity.ts     
│   ├── instanceMappingsServletFilterEntity.ts
│   ├── instanceMetric.entity.ts                -- Endpoint /metrics 存在且可访问 
│   ├── instanceQuartzJob.entity.ts             -- Endpoint /quartz 存在且可访问
│   ├── instanceQuartzTrigger.entity.ts
│   ├── instanceScheduledTasksCron.entity.ts    -- Endpoint /shcedulexdtasks 存在且可访问
│   ├── instanceScheduledTasksCustom.entity.ts  
│   ├── instanceScheduledTasksFixed.entity.ts
│   ├── instanceSystemEnvironment.entity.ts     -- Endpoint /env 存在且可访问
│   ├── instanceSystemProperty.entity.ts        -- Endpoint /env 存在且可访问
│   ├── instanceThreadProfilingRequest.entity.tsx -- Endpoint / threaddump 存在且可访问
│   └── instanceTogglz.entity.ts
├── entity.d.ts     -- 实体类型定义
└── entity.md       -- 文档

```