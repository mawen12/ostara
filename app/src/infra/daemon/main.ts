// 监听来自 renderer process 的守护进程事件
import { ipcMain } from 'electron';
import { getDaemonController } from './daemonController';

// 监听来自 renderer process 的获取守护地址事件
ipcMain.on('daemon:address', (event) => {
  event.returnValue = getDaemonController()?.getDaemonAddress();
});

// 监听来自 renderer process 的获取守护Socket地址事件
ipcMain.on('daemon:wsAddress', (event) => {
  event.returnValue = getDaemonController()?.getDaemonWsAddress();
});

// 监听来自 renderer process 的获取守护是否健康的事件
ipcMain.on('daemon:healthy', (event) => {
  event.returnValue = getDaemonController()?.isHealthy() ?? false;
});
