# 自定义的 React Hook

## 工程结构

```

src/renderer/hooks
├── demo
│   ├── useRestartDemo.ts       -- 重启 demo
│   ├── useStartDemo.ts         -- 启动 demo
│   └── useStopDemo.ts          -- 停止 demo
├── hooks.md                    -- 文档
├── useCopyToClipboard.tsx      -- 添加文本到剪切板
├── useDebounceFn.ts
├── useDelayedEffect.ts
├── useElementDocumentHeight.ts
├── useInstanceHealth.ts        
├── useItemColor.ts             -- 获取元素颜色
├── useItemDisplayName.ts       -- 获取元素展示名称
├── useItemEffectiveColor.ts    -- 获取元素有效颜色
├── useItemIcon.ts              -- 获取元素图标
├── useLocalStorageState.ts     -- 本地存储
├── useRerenderKey.ts
├── useScrollAndHighlightElement.ts
└── useScrollSync.ts

```