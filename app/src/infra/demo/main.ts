import { ipcMain } from 'electron';
import { demoService } from './demoService';

// 监听 demo 启动事件，监听到之后启动demo
ipcMain.handle('demo:start', async () => {
  return demoService.startDemo();
});

// 监听 demo 停止事件，监听到之后停止demo
ipcMain.handle('demo:stop', async () => {
  return demoService.stopDemo();
});

// 监听 demo 获取地址事件，并返回 demo 地址
ipcMain.on('demo:getAddress', (event) => {
  event.returnValue = demoService.getAddress();
});

// 监听 demo 是否启动的事件，并返回 demo 是否启动
ipcMain.on('demo:isStarted', (event) => {
  event.returnValue = demoService.isStarted();
});
