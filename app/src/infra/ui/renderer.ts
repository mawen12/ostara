import { ipcRenderer } from 'electron';
import { ElectronTheme, ThemeSource } from './models/electronTheme';
import { isLinux, isMac, isWindows } from '../utils/platform';
import electronDl from 'electron-dl';

// 提供管理主题、管理窗口、重启应用、下载文件、获取应用信息的功能
export const uiServiceBridge: UiServiceBridge = {
  getTheme(): Promise<ElectronTheme> {
    return ipcRenderer.invoke('uiService:getTheme');
  },
  getThemeSource(): Promise<ThemeSource> {
    return ipcRenderer.invoke('uiService:getThemeSource');
  },

  setThemeSource(themeSource: ThemeSource): Promise<void> {
    return ipcRenderer.invoke('uiService:setThemeSource', themeSource);
  },

  minimizeWindow(): Promise<void> {
    return ipcRenderer.invoke('uiService:minimizeWindow');
  },
  maximizeWindow(): Promise<void> {
    return ipcRenderer.invoke('uiService:maximizeWindow');
  },
  closeWindow(): Promise<void> {
    return ipcRenderer.invoke('uiService:closeWindow');
  },

  restartApp(): Promise<void> {
    return ipcRenderer.invoke('uiService:restartApp');
  },

  downloadFile(url: string, options?: electronDl.Options): Promise<void> {
    return ipcRenderer.invoke('uiService:downloadFile', url, options);
  },

  getAppVersion(): Promise<string> {
    return ipcRenderer.invoke('uiService:getAppVersion');
  },

  getAppId(): Promise<string> {
    return ipcRenderer.invoke('uiService:getAppId');
  },

  isMac: isMac,
  isWindows: isWindows,
  isLinux: isLinux,
};
