import { DemoManager } from './demoManager';

// 模拟的 demo 管理类实现
export class StubDemoManager implements DemoManager {
  // 默认返回 true
  doHealthCheck(): Promise<boolean> {
    return Promise.resolve(true);
  }

  // 默认地址
  getAddress(): string {
    return 'http://localhost:13333/actuator';
  }

  start(): Promise<void> {
    return Promise.resolve();
  }

  stop(): Promise<void> {
    return Promise.resolve();
  }
}
