import { ipcRenderer } from 'electron';

// 对外提供的工具类，提供获取 UUID、读取剪切板内容的功能
export const utilsBridge: UtilsBridge = {
  async uuidv4() {
    return ipcRenderer.invoke('utils:uuidv4');
  },
  async readClipboardText() {
    return ipcRenderer.invoke('utils:readClipboardText');
  },
};
