// 定义不可扩展的Daemon健康检查结果
export type DaemonHealthResult = {
  healthy: boolean;
  message?: string;
};

// 定义接口 Daemon
export interface Daemon {
  // 执行健康检查
  doHealthCheck(): Promise<DaemonHealthResult>;

  // 启动
  start(): Promise<void>;

  // 停止
  stop(): Promise<void>;

  // 获取地址
  getDaemonAddress(): string;

  // 获取 Websocket 地址
  getDaemonWsAddress(): string;
}
