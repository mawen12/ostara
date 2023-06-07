import { app } from 'electron';
import { PackagedDemoManager } from './manager/packagedDemoManager';
import { StubDemoManager } from './manager/stubDemoManager';

// 定义不可扩展的 demo 服务类
class DemoService {
  // 是否启动
  private demoStarted: boolean = false;
  // 管理类初始化，根据 isPackaged 的值区分开发和生产环境
  private demoManager = app.isPackaged ? new PackagedDemoManager() : new StubDemoManager();

  isStarted(): boolean {
    return this.demoStarted;
  }

  // 启动 demo 并返回路径
  async startDemo(): Promise<string> {
    if (this.demoStarted) {
      return this.demoManager.getAddress();
    }
    await this.demoManager.start();
    this.demoStarted = true;
    return this.demoManager.getAddress();
  }

  async stopDemo(): Promise<void> {
    if (!this.demoStarted) {
      return;
    }
    await this.demoManager.stop();
    this.demoStarted = false;
  }

  getAddress(): string {
    return this.demoManager.getAddress();
  }
}

export const demoService = new DemoService();
