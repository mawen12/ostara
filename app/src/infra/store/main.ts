import { ipcMain } from 'electron';
import { configurationStore } from './store';

// 接受由 renderer.ts 发起的调用，执行对应的方法
ipcMain.on('configurationStore:get', (event, key) => {
  event.returnValue = configurationStore.get(key);
});

ipcMain.on('configurationStore:set', (event, key, val) => {
  configurationStore.set(key, val);
});

ipcMain.on('configurationStore:has', (event, key) => {
  event.returnValue = configurationStore.has(key);
});

ipcMain.on('configurationStore:delete', (event, key) => {
  configurationStore.delete(key);
});

ipcMain.on('configurationStore:reset', (event, key) => {
  configurationStore.reset(key);
});

ipcMain.on('configurationStore:clear', (event) => {
  configurationStore.clear();
});
