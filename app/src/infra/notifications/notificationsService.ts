// 通知服务，在主窗口创建时，进行通知服务的初始化
import { app, BrowserWindow, Notification } from 'electron';
import log from 'electron-log';
import { NotificationInfo } from './models/notificationInfo';
import { systemEvents } from '../events';
import { uiService } from '../ui/uiService';
import { isWindows } from '../utils/platform';

// 通知服务类
class NotificationsService {
  // 私有变量，仅当前类可用
  private window: BrowserWindow | undefined;

  // 初始化该类，给属性设置，并增加通知点击的处理
  initialize(window: BrowserWindow) {
    log.info(`Initializing notifications service for window ${window.id}`);

    this.window = window;

    // 当监听到 nitification-clicked 事件时，页面发送 app:notificationClicked 事件，并传递外层事件接受的参数
    systemEvents.on('notification-clicked', (info) => {
      window.webContents.send('app:notificationClicked', info);
    });

    // 如果是windows平台，则设置应用程序模型ID
    // 参考：https://www.electronjs.org/docs/latest/api/app
    if (isWindows) {
      app.setAppUserModelId(uiService.getAppId());
    }
  }

  // 发送通知服务
  sendNotification(info: NotificationInfo): void {
    // 通知信息
    const notification = new Notification({ title: info.title, body: info.body });
    // 展示通知信息
    notification.show();
    // 当通知信息被点击时，应用会展示在最上层，发出 notification-clicked 事件，并传递通知信息
    notification.on('click', (event: Event) => {
      if (this.window?.isMinimized()) {
        this.window?.restore();
      }
      this.window?.focus();

      systemEvents.emit('notification-clicked', info);
    });
  }
}

export const notificationsService = new NotificationsService();
