import { ipcMain } from 'electron';
import { notificationsService } from './notificationsService';

// 监听 发送通知 事件，并调用通知服务发送通知
ipcMain.handle('notificationsService:sendNotification', (event, info) => notificationsService.sendNotification(info));
