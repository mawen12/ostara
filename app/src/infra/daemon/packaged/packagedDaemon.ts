import { RestHealthCheckingDaemon } from '../core/restHealthCheckingDaemon';
import path from 'path';
import { app } from 'electron';
import { isWindows } from '../../utils/platform';
import { configurationStore } from '../../store/store';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import log from 'electron-log';
import fs from 'fs-extra';

// 定义打包运行状态的守护进程
export class PackagedDaemon extends RestHealthCheckingDaemon {
  private readonly address: string;

  private readonly wsAddress: string;

  private readonly host: string = 'localhost';

  private readonly port: number;

  private readonly defaultDaemonLocation = path.join(process.resourcesPath, 'daemon', 'daemon.jar');

  private readonly daemonDatabaseLocation = path.join(app.getPath('userData'), 'daemon.sqlite');

  private readonly defaultJdkLocation = path.join(process.resourcesPath, 'jdk', 'bin', isWindows ? 'java.exe' : 'java');

  private readonly sentryEnabled = configurationStore.get('errorReportingEnabled');

  private childProcess?: ChildProcessWithoutNullStreams = undefined;

  constructor() {
    super();
    // 随机端口
    this.port = Math.floor(Math.random() * 10000) + 10000; // todo: check if port is available
    // http://localhost:port
    this.address = `http://${this.host}:${this.port}`;
    // ws://localhost:port/ws
    this.wsAddress = `ws://${this.host}:${this.port}/ws`;
  }

  getDaemonAddress(): string {
    return this.address;
  }

  getDaemonWsAddress(): string {
    return this.wsAddress;
  }

  // 异步起动方法
  async start(): Promise<void> {
    // 如果存在子进程，则表示应用已经启动，不在重复启动
    if (this.childProcess) {
      log.warn('Packaged Daemon is already started');
      return;
    }

    // 定义执行堆dump保存的路径
    const heapdumpDirectory = path.join(app.getPath('userData'), 'heapdumps');
    fs.ensureDirSync(heapdumpDirectory);

    const env = {
      SERVER_ADDRESS: this.host,
      SERVER_PORT: String(this.port),
      SPRING_DATASOURCE_URL: `jdbc:sqlite:${this.daemonDatabaseLocation}`, // 连接 sqlite 数据库
      SPRING_PROFILES_ACTIVE: this.sentryEnabled ? 'sentry' : '', // 确定要加在的 Spring 配置文件
      APP_MAIN_HEAPDUMP_DIRECTORY: heapdumpDirectory,
    };

    if (!app.isPackaged) {
      // 如果未打包，直接通过 gradle 来启动，并且获取到对应的进程信息
      log.info('Running daemon from source...');
      this.childProcess = spawn(isWindows ? './gradlew' : './gradlew.bat', ['bootRun'], {
        cwd: path.join(__dirname, '..', '..', 'daemon'),
        env: { ...process.env, ...env },
      });
    } else {
      // 如果已经打包，则通过 jdk -jar 的方式来启动，并且获取到对应的进程信息
      log.info('Running daemon from jar...');
      this.childProcess = spawn(this.defaultJdkLocation, ['-jar', this.defaultDaemonLocation], {
        env: { ...process.env, ...env },
      });
    }
    // 
    this.initProcessEvents();
  }

  // 异步停止守护线程
  async stop(): Promise<void> {
    if (this.childProcess) {
      log.info('Stopping daemon process...');
      this.childProcess.kill();
      this.childProcess = undefined;
    }
  }

  // 初始化事件通知
  private initProcessEvents() {
    if (!this.childProcess) {
      return;
    }

    // 监听 data 事件，并打印
    this.childProcess.stdout.on('data', (data) => {
      log.info(`daemon: ${data}`);
    });

    // 监听 data 事件，并打印
    this.childProcess.stderr.on('data', (data) => {
      log.error(`daemon: ${data}`);
    });

    // 监听 exit 事件，并停止子进程
    process.on('exit', () => {
      this.childProcess?.kill();
    });
  }
}
