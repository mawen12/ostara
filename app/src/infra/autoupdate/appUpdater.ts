// 应用更新入口
import { autoUpdater, UpdateInfo } from 'electron-updater';
import path from 'path';
import log from 'electron-log';
import { app, BrowserWindow } from 'electron';
import { systemEvents } from '../events';
import { configurationStore } from '../store/store';
import { scheduleJob } from 'node-schedule';
import semverGt from 'semver/functions/gt';

// 定义应用更新类
export class AppUpdater {
  // 初始化
  constructor(autoUpdate = false) {
    // 如果环境变量设置 development，则读取指定配置文件
    if (process.env.NODE_ENV === 'development') {
      autoUpdater.updateConfigPath = path.join(__dirname, 'app-dev-update.yml');
    }
    // 更新值
    this.updateAutoUpdate(autoUpdate);
    log.transports.file.level = 'info';

    autoUpdater.logger = log;
    // 当监听到 checking-for-update 事件，发送事件 checking-for-update
    autoUpdater.on('checking-for-update', () => {
      log.silly('Checking for update...');
      systemEvents.emit('checking-for-update');
    });
    // 当监听到 update-available 事件，如果版本不一样，发送事件 update-available
    autoUpdater.on('update-available', (info) => {
      log.silly(`Update available: ${JSON.stringify(info)}`);
      if (info.version && semverGt(info.version, app.getVersion())) {
        systemEvents.emit('update-available', info);
      }
    });
    // 当监听到 update-not-available 事件，发送事件 update-not-available
    autoUpdater.on('update-not-available', (info) => {
      log.silly(`Update not available. ${JSON.stringify(info)}`);
      systemEvents.emit('update-not-available', info);
    });
    // 当监听到 error 事件，发送事件 update-error
    autoUpdater.on('error', (err) => {
      log.error(`Error in auto-updater. ${err}`);
      systemEvents.emit('update-error', err);
    });
    // 当监听到 download-pregress 事件，发送事件 update-download-progress
    autoUpdater.on('download-progress', (info) => {
      log.silly(`Download progress: ${JSON.stringify(info)}`);
      systemEvents.emit('update-download-progress', info);
    });
    // 当监听到 update-download 事件，发送事件 update-download
    autoUpdater.on('update-downloaded', (info) => {
      log.silly(`Update downloaded: ${JSON.stringify(info)}`);
      systemEvents.emit('update-downloaded', info);
    });
    // 当监听到 update-cancelled 事件，发送事件 update-cancelled
    autoUpdater.on('update-cancelled', (info) => {
      log.silly(`Update cancelled: ${JSON.stringify(info)}`);
      systemEvents.emit('update-cancelled', info);
    });
    // 开启定时任务，每隔5分钟执行一次
    scheduleJob('0 */5 * * * *', this.checkForUpdatesJob.bind(this));
    // 
    this.checkForUpdatesJob();
  }

  // 更新自动更新状态
  updateAutoUpdate(autoUpdate: boolean) {
    autoUpdater.autoDownload = autoUpdate; // 自动下载
    autoUpdater.autoInstallOnAppQuit = autoUpdate; // 应用退出后自动安装
    log.info(`autoUpdate update set to ${autoUpdate} `);
  }

  // 异步检查更新，如果版本高于当前版本信息，则返回版本信息
  async checkForUpdates(): Promise<UpdateInfo | undefined> {
    const result = await autoUpdater.checkForUpdates();
    if (result?.updateInfo && semverGt(result.updateInfo.version, app.getVersion())) {
      return result.updateInfo;
    }
    return undefined;
  }

  // 下载更新
  downloadUpdate() {
    autoUpdater.downloadUpdate();
  }

  // 退出并安装
  quitAndInstall() {
    autoUpdater.quitAndInstall();
  }

  // 校验更新任务，如果最后更新时间在一小时之前，则将应用最后检查时间更新，并检查版本信息
  private async checkForUpdatesJob() {
    if (configurationStore.get('lastUpdateCheckTime') < Date.now() - 1000 * 60 * 60) {
      configurationStore.set('lastUpdateCheckTime', Date.now());
      await this.checkForUpdates();
    }
  }
}
// 初始化应用更新订阅
export function initializeAppUpdaterSubscriptions(window: BrowserWindow) {
  // 当监听到 checking-for-update 事件，发布事件 app:checkingForUpdate
  systemEvents.on('checking-for-update', () => {
    window.webContents.send('app:checkingForUpdate');
  });
  // 当监听到 update-available 事件，发布事件 app:updateAvailable
  systemEvents.on('update-available', (info) => {
    window.webContents.send('app:updateAvailable', info);
  });
  // 当监听到 update-not-available 事件，发布事件 app:updateNotAvailable
  systemEvents.on('update-not-available', (info) => {
    window.webContents.send('app:updateNotAvailable', info);
  });
  // 当监听到 update-download-progress 事件，发布事件 app:updateDownloadProgress
  systemEvents.on('update-download-progress', (info) => {
    window.webContents.send('app:updateDownloadProgress', info);
  });
  // 当监听到 update-download 事件，发布事件 app:updateDownload
  systemEvents.on('update-downloaded', (info) => {
    window.webContents.send('app:updateDownloaded', info);
  });
  // 当监听到 update-error 事件，发布事件 app:updateError
  systemEvents.on('update-error', (error) => {
    window.webContents.send('app:updateError', error);
  });
}

configurationStore.onDidChange('autoUpdateEnabled', (newValue) => {
  if (newValue !== undefined) {
    appUpdater.updateAutoUpdate(newValue);
  }
});

export const appUpdater = new AppUpdater(configurationStore.get('autoUpdateEnabled'));
