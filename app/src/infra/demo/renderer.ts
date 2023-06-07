import { ipcRenderer } from 'electron';

// 提供操作 demo 的操作方法
export const demoBridge: DemoBridge = {
  // 启动 demo
  startDemo(): Promise<string> {
    return ipcRenderer.invoke('demo:start');
  },
  // 停止 demo
  stopDemo(): Promise<void> {
    return ipcRenderer.invoke('demo:stop');
  },

  getDemoAddress(): string {
    return ipcRenderer.sendSync('demo:getAddress');
  },
  isStarted(): boolean {
    return ipcRenderer.sendSync('demo:isStarted');
  },
};
