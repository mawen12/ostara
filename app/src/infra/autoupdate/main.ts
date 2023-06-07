import { ipcMain } from 'electron';
import { appUpdater } from './appUpdater';

// 监听来自 renderer process 的 是否存在更新的事件
ipcMain.handle('appUpdater:checkForUpdates', () => appUpdater.checkForUpdates());
// 监听来自 renderer process 的 下载更新的事件
ipcMain.on('appUpdater:downloadUpdate', () => appUpdater.downloadUpdate());
// 监听来自 renderer process 的 退出并安装更新的事件
ipcMain.on('appUpdater:quitAndInstall', () => appUpdater.quitAndInstall());
