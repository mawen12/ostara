// 页面运行之前最先加载的脚本，main.ts
import { contextBridge } from 'electron';
import { utilsBridge } from '../infra/rendererUtils/renderer';
import { subscriptionsBridge } from '../infra/subscriptions/renderer';
import { uiServiceBridge } from '../infra/ui/renderer';
import { daemonAddressSupplier, daemonHealthySupplier, daemonWsAddressSupplier } from '../infra/daemon/renderer';
import { configurationStore } from '../infra/store/store';
import { configurationStoreBridge } from '../infra/store/renderer';
import { appUpdaterBridge } from '../infra/autoupdate/renderer';
import { demoBridge } from '../infra/demo/renderer';
import { notificationsServiceBridge } from '../infra/notifications/renderer';

contextBridge.exposeInMainWorld('utils', utilsBridge); // 暴露工具
contextBridge.exposeInMainWorld('subscriptions', subscriptionsBridge); // 暴露订阅
contextBridge.exposeInMainWorld('ui', uiServiceBridge); // 暴露 UI
contextBridge.exposeInMainWorld('isElectron', true); // 暴露 Electron
contextBridge.exposeInMainWorld('daemonAddress', daemonAddressSupplier());// 暴露 daemon 地址
contextBridge.exposeInMainWorld('daemonWsAddress', daemonWsAddressSupplier()); // 暴露 daemon Websocket 地址
contextBridge.exposeInMainWorld('daemonHealthy', daemonHealthySupplier); // 暴露 daemon 健康
contextBridge.exposeInMainWorld('NODE_ENV', process.env.NODE_ENV); // 暴露 NODE 环境变量
contextBridge.exposeInMainWorld('configurationStore', configurationStoreBridge); // 暴露配置存储
contextBridge.exposeInMainWorld('appUpdater', appUpdaterBridge); // 暴露应用更新
contextBridge.exposeInMainWorld('demo', demoBridge); // 暴露 demo
contextBridge.exposeInMainWorld('notifications', notificationsServiceBridge); // 暴露通知
