/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
// 项目入口，在 app/package.json 中配置
import 'reflect-metadata';
import path from 'path';
import { app, BrowserWindow, nativeTheme, shell } from 'electron';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import '../infra';
import { uiService } from '../infra/ui/uiService';
import { getDaemonController, initDaemonController } from '../infra/daemon/daemonController';
import { systemEvents } from '../infra/events';
import { isMac, isWindows } from '../infra/utils/platform';
import contextMenu from 'electron-context-menu'; // 
import * as Sentry from '@sentry/electron';
import { configurationStore } from '../infra/store/store';
import { scheduleJob } from 'node-schedule';
import { appUpdater, initializeAppUpdaterSubscriptions } from '../infra/autoupdate/appUpdater';
import { notificationsService } from '../infra/notifications/notificationsService';

// 如果开启了错误报错，则初始化Sentry
if (configurationStore.get('errorReportingEnabled')) {
  Sentry.init({ dsn: 'https://d28c9ac8891348d0926af5d2b8454988@o4504882077302784.ingest.sentry.io/4504882079531008' });
  Sentry.setTag('service.type', 'electron.main');
}

// 获取应用单例锁
const gotInstanceLock = app.requestSingleInstanceLock();

let splashWindow: BrowserWindow | null = null;
let mainWindow: BrowserWindow | null = null;

// 如果变量指定为生产环境，则安装 source-map-support，用于为堆栈跟踪提供源映射支持
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

// 判断应用变量指定为develop或DEBUG_PROD=true，
const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

// 如果是则加载 electron debug 功能
if (isDebug) {
  require('electron-debug')();
}

// 异步安装electron devtools插件
const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

// 异步创建应用的启动窗口
// 参考：https://blog.csdn.net/qq_41453285/article/details/99581870
const createSplashWindow = async () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  // 启动窗口
  // 参考：https://www.electronjs.org/docs/latest/api/browser-window#winresizable
  splashWindow = new BrowserWindow({
    show: true, // 窗口创建之后展示
    title: 'Loading', // 窗口标题
    width: 500, // 窗口宽度，单位：像素
    height: 300, // 窗口高度，单位：像素
    icon: getAssetPath('icon.png'), // 窗口图标
    resizable: false, // 不允许用户手动调整窗口大小
    frame: false, // 可创建无框窗口
    center: true, // 在屏幕中央展示窗口
    webPreferences: {
      devTools: false, // 禁用 DevTools
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(__dirname, '../../.erb/dll/preload.js'), // 指定在页面运行其他脚本之前加载的脚本
    },
  });

  // 启动窗口加载对应的 HTML
  splashWindow.loadFile(getAssetPath('splash.html'));

  // 在监听到 ready-on-show 的事件后，开始展示窗口。
  splashWindow.on('ready-to-show', () => {
    if (!splashWindow) {
      throw new Error('"splashWindow" is not defined');
    }
    splashWindow.show();
  });

  // 在监听到 closed 事件后，启动窗口置空
  splashWindow.on('closed', () => {
    splashWindow = null;
  });
};

// 异步创建应用的主窗口
const createMainWindow = async () => {
  // 如果是 debug，则安装 electron devtools 插件
  if (isDebug) {
    await installExtensions();
  }

  // 上下文菜单，页面右击显示的内容
  contextMenu({
    showSaveImageAs: false, // 不展示 图片另存为
    showCopyImage: false, // 不展示 复制图片
    showCopyLink: false, // 不展示 复制链接
    showServices: false, // 不展示 服务
    showSearchWithGoogle: false, // 不展示 使用Google搜索
    showLookUpSelection: false, // 不展示 查找选项
    showLearnSpelling: false, // 不展示 学习拼写
  });

  // 资源路径
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  // 资产路径
  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const backgroundColor = nativeTheme.shouldUseDarkColors ? '#161C24' : '#ffffff';
  const color = nativeTheme.shouldUseDarkColors ? '#ffffff' : '#212B36';

  mainWindow = new BrowserWindow({
    show: false, // 窗口创建之后不展示
    width: 1440, // 窗口宽度，单位：像素
    height: 900, // 窗口高度，单位：像素
    icon: getAssetPath('icon.png'), // 窗口图标
    minWidth: 700, // accommodate 800 x 600 display minimum 窗口最小宽度，单位：像素
    minHeight: 500, // accommodate 800 x 600 display minimum 窗口最小高度，单位：像素
    backgroundColor: backgroundColor, // 窗口背景色
    frame: isMac, // 如果是mac系统，则不允许创建无框窗口，否则便允许创建无框窗口
    titleBarStyle: isMac ? 'hidden' : undefined, // 窗口标题栏样式，如果是mac系统，隐藏，否则不设置
    titleBarOverlay: isMac // 在mac系统上将无框框口与 setWindowButtonVisibility(true)结合使用，或使用 titleBarStyle 以使标准窗口控件(macos上的红绿灯)可见。此属性将启用窗口控件覆盖 JS API 和 CSS 环境变量，指定true将产生具有默认系统颜色的覆盖。
      ? {
          height: 40 + (isWindows ? -1 : 0), // 高度
          color: backgroundColor, // 背景色
          symbolColor: color, // 标志颜色
        }
      : undefined,
    webPreferences: { // 设置网页功能
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(__dirname, '../../.erb/dll/preload.js'), 
    },
  });

  // 主窗口加载对应的 HTML，代码编写为 ../renderer/index.jsx
  mainWindow.loadURL(resolveHtmlPath('index.html'));

  // 在监听到 ready-to-show 事件后，关闭启动窗口，展示主窗口，并聚焦。
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (splashWindow) {
      splashWindow.close();
      splashWindow = null;
    }
    mainWindow.show();
    mainWindow.focus();
  });

  // 在监听到 closed 事件后，主窗口置空
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 展示主窗口菜单栏
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // 设置打开窗口处理器，在用户浏览器打开链接
  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // 初始化UI类，当主题发生改变时，重新渲染窗口
  uiService.initialize(mainWindow);
  // 初始化通知类，当通知被点击时，发送 app:notificationClicked 事件
  notificationsService.initialize(mainWindow);
  // 初始化Daemon程序订阅
  getDaemonController()?.initializeSubscriptions(mainWindow);

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  log.transports.console.level = 'info';
  // 初始化应用更新时间的订阅
  initializeAppUpdaterSubscriptions(mainWindow);
};

/**
 * Add event listeners...
 */
// 在监听到 window-all-closed 事件后，退出应用
app.on('window-all-closed', () => {
  app.quit();
});

// 如果获取不到单例锁，表示应用已启动，则退出
if (!gotInstanceLock) {
  app.quit();
} else {
  // 当监听到 second-instance 事件后，将主窗口展示，并聚焦
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });

  // 当监听到 ready 事件后，异步创建启动窗口，
  app
    .whenReady()
    .then(async () => {
      await createSplashWindow();
      // 当监听到 daemon-ready 事件后，创建主窗口
      systemEvents.on('daemon-ready', () => {
        log.info('Creating main window (daemon ready event)');
        createMainWindow();
      });
      // 初始化 deamon 控制器
      await initDaemonController();
    })
    .catch(console.log);
}
