import { ipcMain } from 'electron';
import { uiService } from './uiService';

// 接受从 renderer 的调用，并在底层调用 ui服务 
ipcMain.handle('uiService:getTheme', () => uiService.getElectronTheme());
ipcMain.handle('uiService:getThemeSource', (event) => uiService.getThemeSource());
ipcMain.handle('uiService:setThemeSource', (event, themeSource) => uiService.setThemeSource(themeSource));
ipcMain.handle('uiService:minimizeWindow', (event) => uiService.minimizeWindow());
ipcMain.handle('uiService:maximizeWindow', (event) => uiService.maximizeWindow());
ipcMain.handle('uiService:closeWindow', (event) => uiService.closeWindow());
ipcMain.handle('uiService:restartApp', (event) => uiService.restartApp());
ipcMain.handle('uiService:downloadFile', (event, url, options) => uiService.downloadFile(url, options));
ipcMain.handle('uiService:getAppVersion', (event) => uiService.getAppVersion());
ipcMain.handle('uiService:getAppId', (event) => uiService.getAppId());
