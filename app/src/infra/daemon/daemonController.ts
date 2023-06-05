// Daemon 控制器，在主窗口创建时
import { app, BrowserWindow } from 'electron';
import log from 'electron-log';
import { systemEvents } from '../events';
import { Daemon } from './core/daemon';
import { PackagedDaemon } from './packaged/packagedDaemon';
import { RemoteDaemon } from './remote/remoteDaemon';

// Daemon 控制器类
export class DaemonController {
  // 私有变量，是否已经启动
  private started: boolean = false;
  // 私有变量，是否运行中
  private running: boolean = false;
  // 私有变量，健康检查间隔
  private healthCheckInterval: NodeJS.Timeout | undefined;

  // 私有变量，是否只读
  constructor(private readonly daemon: Daemon) {}

  // 初始化订阅
  initializeSubscriptions(window: BrowserWindow) {
    // 当监听到 daemon-healthy 事件时，页面发送 app:daemonHealthy 事件
    systemEvents.on('daemon-healthy', () => {
      window.webContents.send('app:daemonHealthy');
    });

    // 当监听到 daemon-unhealthy 事件时，页面发送 app:daemonUnhealthy 事件
    systemEvents.on('daemon-unhealthy', () => {
      window.webContents.send('app:daemonUnhealthy');
    });
  }

  // 获取 daemon 地址
  getDaemonAddress(): string {
    return this.daemon.getDaemonAddress();
  }

  // 获取 daemon Websocket 地址
  getDaemonWsAddress(): string {
    return this.daemon.getDaemonWsAddress();
  }

  // 异步启动，启动后开始健康检查
  async start() {
    log.info('Starting daemon...');
    await this.daemon.start();
    this.startHealthCheck();
  }

  // 异步停止，开始停止前，先停止健康检查，并设置对应的状态
  async stop() {
    log.info('Stopping daemon...');
    this.stopHealthCheck();
    await this.daemon.stop();
    this.started = false;
    this.running = false;
  }

  // 异步重启，先停止，再启动
  async restart() {
    await this.stop();
    await this.start();
  }

  // 返回是否检查，只有已启动，且正在运行，才是健康
  isHealthy(): boolean {
    return this.started && this.running;
  }

  // 健康检查
  private startHealthCheck() {
    // 如果已经设置，那么不再执行
    if (this.healthCheckInterval) {
      return;
    }
    log.info('Starting health check interval');
    // 异步执行健康检查，间隔1s
    this.healthCheckInterval = setInterval(async () => {
      log.silly('Running daemon health check...');
      // 执行健康检查，并获取到检查结果
      const { healthy, message } = await this.daemon.doHealthCheck();
      log.silly(`Daemon health check result: ${healthy} - ${message}`);
      if (healthy) {
        if (!this.started) {
          // 如果健康，但是未启动，则发送 daemon-ready 事件
          log.info('Daemon is ready!');
          systemEvents.emit('daemon-ready');
        } else if (!this.running && this.started) {
          // 如果健康，但是已启动，却未在运行，则发送 daemon-healthy 事件
          log.info('Daemon is healthy!');
          systemEvents.emit('daemon-healthy');
        }
        // 设置状态
        this.running = true;
        this.started = true;
      } else {
        if (this.running && this.started) {
          // 如果不健康，但是已启动且正在运行，则发送 daemon-unhealthy
          log.info('Daemon is unhealthy!');
          systemEvents.emit('daemon-unhealthy');
        }
        // 设置状态
        this.running = false;
      }
    }, 1000);
  }

  // 停止健康检查
  private stopHealthCheck() {
    if (this.healthCheckInterval) {
      // 如果检查正在运行，则清除健康检查间隔，并置空
      log.info('Stopping health check...');
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = undefined;
    }
  }
}

let daemonController: DaemonController | undefined;

// 返回 DaemonController
export function getDaemonController(): DaemonController | undefined {
  return daemonController;
}

// 初始化 DaemonController，并返回一个 Promise 代理对象
// 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
export async function initDaemonController(): Promise<DaemonController> {
  // 如果已经初始化过，则直接返回
  if (daemonController) {
    return daemonController;
  }
  if (app.isPackaged) {
    daemonController = new DaemonController(new PackagedDaemon());
  } else {
    // 创建默认的 DaemonController，底层使用 RemoteDaemon，连接本地 12222 端口
    daemonController = new DaemonController(
      new RemoteDaemon({
        host: '127.0.0.1',
        port: 12222,
        protocol: 'http',
      })
    );
  }
  // 启动失败，则退出应用
  daemonController.start().catch((e) => {
    log.error('Error starting daemon', e);
    app.exit(1);
  });
  return daemonController;
}
