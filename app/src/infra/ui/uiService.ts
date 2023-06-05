// UI服务，在主窗口创建时，进行页面的初始化
import { app, BrowserWindow, nativeTheme } from 'electron';
import { ElectronTheme, ThemeSource } from './models/electronTheme';
import log from 'electron-log';
import electronDl, { download } from 'electron-dl';

// UI服务类
class UiService {
  // 私有变量，仅在该类中可用 窗口，类型为 BrowserWindow 或 undefined
  // 参考：https://www.tutorialsteacher.com/typescript/data-modifiers
  private window: BrowserWindow | undefined;

  // 初始化该类，给属性设置，并增加主题变更的处理
  initialize(window: BrowserWindow) {
    log.info(`Initializing ui service for window ${window.id}`);

    this.window = window;

    // 当监听到 updated 事件时，页面发送 app:themeUpdated 事件，并传递 Electron 主题
    nativeTheme.on('updated', () => {
      window.webContents.send('app:themeUpdated', this.getElectronTheme());
    });
  }

  // 获取 Electron 主题，返回类型为 ElectronTheme
  getElectronTheme(): ElectronTheme {
    return {
      shouldUseDarkColors: nativeTheme.shouldUseDarkColors, // 是否允许使用暗黑颜色
      shouldUseHighContrastColors: nativeTheme.shouldUseHighContrastColors, // 是否允许使用高对比度颜色
      shouldUseInvertedColorScheme: nativeTheme.shouldUseInvertedColorScheme, // 是否允许使用反转配色方案
    };
  }

  // 获取主题源
  getThemeSource(): ThemeSource {
    return nativeTheme.themeSource;
  }

  // 设置主题源
  setThemeSource(themeSource: ThemeSource) {
    nativeTheme.themeSource = themeSource;
  }

  // 窗口最小化
  minimizeWindow(): void {
    this.window?.minimize();
  }

  // 窗口最大化，如果已经最大化，则取消最大化
  maximizeWindow(): void {
    if (this.window?.isMaximized()) {
      this.window?.unmaximize();
    } else {
      this.window?.maximize();
    }
  }

  // 关闭窗口
  closeWindow(): void {
    this.window?.close();
  }

  // 重启应用程序
  restartApp(): void {
    // 退出当前实例
    app.relaunch();
    // 退出应用
    app.quit();
  }

  // 下载文件
  downloadFile(url: string, options?: electronDl.Options): void {
    download(this.window!, url, options);
  }

  // 获取应用版本
  getAppVersion(): string {
    return app.getVersion();
  }

  // 获取应用id
  getAppId(): string {
    return 'dev.krud.boost';
  }
}

export const uiService = new UiService();
