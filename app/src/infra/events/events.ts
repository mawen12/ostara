// 事件
import { UpdateInfo } from 'electron-updater';
import { ProgressInfo } from 'electron-builder';
import { NotificationInfo } from '../notifications/models/notificationInfo';

// 定义不可扩展的事件类
export type Events = {
  /**
   * System
   */
  // daemon 准备就绪事件，逻辑见：DaemonController#startHealthCheck
  'daemon-ready': () => void;
  // daemon 健康事件，逻辑见：DaemonController#startHealthCheck
  'daemon-healthy': () => void;
  // daemon 不健康事件，逻辑见：DaemonController#startHealthCheck
  'daemon-unhealthy': () => void;

  /**
   * Updates
   */
  // 检查更新事件
  'checking-for-update': () => void;
  // 更新可用事件
  'update-available': (info: UpdateInfo) => void;
  // 更新不可用事件
  'update-not-available': (info: UpdateInfo) => void;
  // 更新下载进度事件
  'update-download-progress': (info: ProgressInfo) => void;
  // 更新以下载事件
  'update-downloaded': (info: UpdateInfo) => void;
  // 更新错误事件
  'update-error': (error: Error) => void;
  // 更新取消事件
  'update-cancelled': (info: UpdateInfo) => void;

  /**
   * Notifications
   */
  // 通知被点击事件，在通知被点击时触发，逻辑见：NotificationService#sendNotification
  'notification-clicked': (info: NotificationInfo) => void;
};
