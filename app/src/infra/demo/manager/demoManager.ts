// 定义 demo 管理接口
export interface DemoManager {
  // 健康检查
  doHealthCheck(): Promise<boolean>;
  // 启动
  start(): Promise<void>;
  // 关闭
  stop(): Promise<void>;
  // 返回地址
  getAddress(): string;
}
