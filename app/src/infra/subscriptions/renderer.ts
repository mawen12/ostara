import { ipcRenderer } from 'electron';

// 对外暴露订阅操作
export const subscriptionsBridge: SubscriptionsBridge = {
  subscribe: (channel, listener) => {
    ipcRenderer.on(channel, listener);
    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  },
};
