import { ipcMain } from 'electron';
import { appUpdater } from './appUpdater';

ipcMain.handle('appUpdater:checkForUpdates', () => appUpdater.checkForUpdates());
ipcMain.on('appUpdater:downloadUpdate', () => appUpdater.downloadUpdate());
ipcMain.on('appUpdater:quitAndInstall', () => appUpdater.quitAndInstall());
