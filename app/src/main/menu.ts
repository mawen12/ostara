// 窗口顶部的菜单按钮
import { app, BrowserWindow, Menu, MenuItemConstructorOptions, shell } from 'electron';
import { isMac } from '../infra/utils/platform';
import { MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR } from './consts';

// 绘制按钮图标构造器选项，继承 MenuItemConstructorOptions
// 参考：https://devblogs.microsoft.com/typescript/walkthrough-interfaces/#Subsection_64
// 参考：https://juejin.cn/post/6844903749501059085
// 参考：https://www.typescripttutorial.net/typescript-tutorial/typescript-extend-interface/
interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  // 选择器名称
  selector?: string;
  // 子按钮，可空，支持当前类型的数组或Menu
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

// 按钮构建器，并输出default的变量
export default class MenuBuilder {
  // 主窗口
  mainWindow: BrowserWindow;

  // 构造器
  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  // 构建菜单，无参，返回Menu类型
  buildMenu(): Menu {
    // 如果是以开发模式或启动了debug，则启动开发环境
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      this.setupDevelopmentEnvironment();
    }

    // 获取对应平台的菜单模板
    const template = isMac ? this.buildMacTemplate() : this.buildDefaultTemplate();
    // 基于模板构建菜单
    const menu = Menu.buildFromTemplate(template);
    // 设置应用程序的菜单
    Menu.setApplicationMenu(menu); 

    return menu;
  }

  // 设置开发环境
  setupDevelopmentEnvironment(): void {
    // 当监听到 context-menu 事件时，开始构建开发环境的模板
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      // 定义变量，x = props.x, y = props.x
      // 参考：https://www.typescriptlang.org/docs/handbook/variable-declarations.html
      const { x, y } = props;

      // 添加 devtools
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          },
        },
      ]).popup({ window: this.mainWindow });
    });
  }

  // 构建 Mac 模板，返回数组 MenuItemConstructorOptions
  buildMacTemplate(): MenuItemConstructorOptions[] {
    // 定义菜单 About
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      // 按钮展示的名称
      label: 'Ostara',
      // 按钮的下级按钮
      submenu: [
        {
          label: 'About Ostara',
          // 按钮选择器
          selector: 'orderFrontStandardAboutPanel:', 
        },
        { type: 'separator' }, // 分割线
        {
          label: 'Services',
          submenu: [],
        },
        { type: 'separator' },
        {
          label: 'Settings',
          // 按钮点击时，发送事件 trigger:openSettings
          click: () => {
            this.mainWindow.webContents.send('trigger:openSettings');
          },
        },
        { type: 'separator' },
        {
          label: 'Hide Ostara',
          // 快捷键
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    };
    // 定义菜单 Edit
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    };
    // 定义 reload 选项列表
    const reloadOptions: MenuItemConstructorOptions[] = [
      {
        label: 'Reload',
        accelerator: 'Command+R',
        click: () => {
          this.mainWindow.webContents.getZoomLevel();
        },
      },
      {
        label: 'Force Reload',
        accelerator: 'Shift+Command+R',
        click: () => {
          this.mainWindow.webContents.reloadIgnoringCache();
        },
      },
    ];

    // 定义全屏选项
    const fullScreenOption: MenuItemConstructorOptions = {
      label: 'Toggle Full Screen',
      accelerator: 'Ctrl+Command+F',
      click: () => {
        this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
      },
    };

    // 定义 Zoom 选项
    const zoomOptions: MenuItemConstructorOptions[] = [
      {
        label: 'Zoom In',
        accelerator: 'Command+Plus',
        click: () => {
          this.mainWindow.webContents.setZoomFactor(
            Math.min(MAX_ZOOM_FACTOR, this.mainWindow.webContents.getZoomFactor() + 0.1)
          );
          console.log(this.mainWindow.webContents.getZoomFactor());
        },
      },
      {
        label: 'Zoom Out',
        accelerator: 'Command+-',
        click: () => {
          this.mainWindow.webContents.setZoomFactor(
            Math.max(MIN_ZOOM_FACTOR, this.mainWindow.webContents.getZoomFactor() - 0.1)
          );
          console.log(this.mainWindow.webContents.getZoomFactor());
        },
      },
      {
        label: 'Reset Zoom',
        accelerator: 'Command+0',
        click: () => {
          this.mainWindow.webContents.setZoomFactor(1);
        },
      },
    ];

    // 定义开发环境菜单 View
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      // 子菜单中包含数组 reload、分隔符、全屏、分隔符、zoom、分隔符、dev
      submenu: [
        ...reloadOptions,
        { type: 'separator' },
        fullScreenOption,
        { type: 'separator' },
        ...zoomOptions,
        { type: 'separator' },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          },
        },
      ],
    };
    // 定义生产环境菜单 View，比开发环境缺少 DevTools
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [...reloadOptions, { type: 'separator' }, fullScreenOption, { type: 'separator' }, ...zoomOptions],
    };
    // 定义菜单 Window
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' },
      ],
    };
    // 定义菜单 Help
    const subMenuHelp: MenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: 'Star us on GitHub',
          click() {
            // 使用默认浏览器打开链接
            shell.openExternal('https://github.com/krud-dev/ostara');
          },
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal('https://docs.ostara.dev/');
          },
        },
        { type: 'separator' },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/krud-dev/ostara/issues');
          },
        },
        {
          label: 'Submit a Bug Report',
          click() {
            shell.openExternal(
              'https://github.com/krud-dev/ostara/issues/new?assignees=&labels=bug&template=1-Bug_report.md'
            );
          },
        },
      ],
    };

    // 判断使用菜单 View
    const subMenuView =
      process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true' ? subMenuViewDev : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  // 构建默认模板，
  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Open',
            accelerator: 'Ctrl+O',
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            },
          },
        ],
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  },
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                  },
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.webContents.toggleDevTools();
                  },
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                  },
                },
              ]
            : [
                {
                  label: 'Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  },
                },
                {
                  label: 'Force Reload',
                  accelerator: 'Shift+Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reloadIgnoringCache();
                  },
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                  },
                },
              ],
      },
    ];

    return templateDefault;
  }
}
