// 提供给 renderer process 的应用更新入口
import { ipcRenderer } from 'electron';

// 定义应用更新中转
export const appUpdaterBridge: AppUpdaterBridge = {
  // 校验更新
  checkForUpdates: () => ipcRenderer.invoke('appUpdater:checkForUpdates'),
  // 下载更新
  downloadUpdate: () => ipcRenderer.send('appUpdater:downloadUpdate'),
  // 退出并安装更新
  quitAndInstall: () => ipcRenderer.send('appUpdater:quitAndInstall'),
};
