import { clipboard, ipcMain } from 'electron';
import { v4 as uuidv4 } from 'uuid';

// 响应
ipcMain.handle('utils:uuidv4', async (event) => {
  return uuidv4();
});
ipcMain.handle('utils:readClipboardText', async (event) => {
  return clipboard.readText();
});
