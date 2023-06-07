import { ipcRenderer } from 'electron';
import { NotificationInfo } from './models/notificationInfo';

// 对外提供发送通知的方法，底层发送事件，由 main.ts 监听处理
export const notificationsServiceBridge: NotificationsServiceBridge = {
  sendNotification(info: NotificationInfo): Promise<void> {
    return ipcRenderer.invoke('notificationsService:sendNotification', info);
  },
};
