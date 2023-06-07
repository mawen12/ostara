import { DemoManager } from './demoManager';
import path from 'path';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import log from 'electron-log';
import { isWindows } from '../../utils/platform';
import axios from 'axios';

// 打包的 demo 管理类实现
export class PackagedDemoManager implements DemoManager {
  private readonly address: string;

  private readonly host: string = 'localhost';

  private readonly port: number;

  // jdk 路径
  private readonly defaultJdkLocation = path.join(process.resourcesPath, 'jdk', 'bin', isWindows ? 'java.exe' : 'java');
  // demo 路径
  private readonly defaultDemoLocation = path.join(process.resourcesPath, 'demo', 'demo.jar');
  // demo 启动后对应的进程
  private childProcess?: ChildProcessWithoutNullStreams = undefined;

  constructor() {
    // 设置范围在[10000, 20000)的随机端口
    this.port = Math.floor(Math.random() * 10000) + 10000;
    this.address = `http://${this.host}:${this.port}/actuator`;
  }

  // 健康检查
  async doHealthCheck(): Promise<boolean> {
    try {
      // 使用 axios 请求指定 demo
      const response = await axios.get(this.getAddress());
      if (response.status >= 200 && response.status < 300) {
        return true;
      }

      return false;
    } catch (err) {
      if (err instanceof Error) {
        log.error(`Error while checking demo health: ${err.message}`);
        return false;
      }

      log.error(`Error while checking demo health: ${err}`);
      return false;
    }
  }

  getAddress(): string {
    return this.address;
  }

  start(): Promise<void> {
    // 如果 demo 已经启动，则返回空值
    if (this.childProcess) {
      log.warn('Packaged Demo is already started');
      return Promise.resolve();
    }
    // 创建变量副本
    const env = {
      SERVER_ADDRESS: this.host,
      SERVER_PORT: String(this.port),
    };

    log.info(`Running demo from jar on ${this.address}...`);
    // 使用 java -jar 启动
    this.childProcess = spawn(this.defaultJdkLocation, ['-jar', this.defaultDemoLocation], {
      env: { ...process.env, ...env },
    });
    log.info(`Demo process started with PID: ${this.childProcess.pid}`);
    // 初始化处理事件，用于监听 data、exit 等事件
    this.initProcessEvents();
    let healthCheckAttempts = 0;
    const promise = new Promise<void>((resolve, reject) => {
      // 设置定时的心跳检查，间隔 1s
      const healthCheck = setInterval(async () => {
        if (healthCheckAttempts > 60) {
          // 如果在1s内连续60次检查都失败，那么就停止子进程
          clearInterval(healthCheck);
          if (this.childProcess) {
            this.childProcess.kill();
            this.childProcess = undefined;
          }
          reject(new Error('Demo process did not start in time'));
          return;
        }
        try {
          // 执行心跳检查调用
          const isHealthy = await this.doHealthCheck();
          if (isHealthy) {
            clearInterval(healthCheck);
            resolve();
            return;
          }
        } catch (e) {
        } finally {
          healthCheckAttempts += 1;
        }
      }, 1000);
    });

    return promise;
  }

  async stop(): Promise<void> {
    if (this.childProcess) {
      log.info('Stopping demo process...');
      this.childProcess.kill();
      this.childProcess = undefined;
    }
  }

  private initProcessEvents() {
    if (!this.childProcess) {
      return;
    }

    // 监听 data 事件，并日志输出
    this.childProcess.stdout.on('data', (data) => {
      log.debug(`demo: ${data}`);
    });

    // 监听 data 事件，并日志输出
    this.childProcess.stderr.on('data', (data) => {
      log.error(`demo: ${data}`);
    });

    // 监听 exit 事件，停止子进程
    process.on('exit', () => {
      this.childProcess?.kill();
    });
  }
}
