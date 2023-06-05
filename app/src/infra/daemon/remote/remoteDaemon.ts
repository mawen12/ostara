import log from 'electron-log';
import { RestHealthCheckingDaemon } from '../core/restHealthCheckingDaemon';

// 定义不可扩展的远程Daemon选项
export type RemoteDaemonOptions = {
  // 协议
  protocol: 'http' | 'https';
  // 主机
  host: string;
  // 端口
  port: number;
};

// 定义远程Daemon类
export class RemoteDaemon extends RestHealthCheckingDaemon {
  // 私有只读变量，地址
  private readonly address: string;
  // 私有只读变量，Websocket 地址
  private readonly wsAddress: string;

  // 构造器初始化私有只读变量
  constructor(private readonly options: RemoteDaemonOptions) {
    super();
    this.address = `${options.protocol}://${options.host}:${options.port}`;
    this.wsAddress = `${options.protocol === 'http' ? 'ws' : 'wss'}://${options.host}:${options.port}/ws`;
  }

  getDaemonAddress(): string {
    return this.address;
  }

  getDaemonWsAddress(): string {
    return this.wsAddress;
  }

  async start(): Promise<void> {
    log.warn('Daemon is remote, cannot start it');
  }

  async stop(): Promise<void> {
    log.warn('Daemon is remote, cannot stop it');
  }
}
