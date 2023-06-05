import axios from 'axios';
import { Daemon, DaemonHealthResult } from './daemon';

// 定义抽象类 Rest 健康检查
export abstract class RestHealthCheckingDaemon implements Daemon {
  // 异步的健康检查
  async doHealthCheck(): Promise<DaemonHealthResult> {
    try {
      // 使用 axios 执行 GET 请求 Daemon 地址
      const response = await axios.get(this.getDaemonAddress());
      // 如果响应状态值在[200, 300) 之间，则返回成功
      if (response.status >= 200 && response.status < 300) {
        return { healthy: true };
      }

      // 返回失败的状态
      return { healthy: false, message: `Received status code ${response.status}` };
    } catch (err) {
      // 捕获错误
      if (err instanceof Error) {
        return { healthy: false, message: err.message };
      }

      return { healthy: false, message: `Unknown error: ${err}` };
    }
  }
  
  // 返回 Daemon 地址
  abstract getDaemonAddress(): string;

  // 返回 Daemon Websocket 地址
  abstract getDaemonWsAddress(): string;

  // 启动
  abstract start(): Promise<void>;

  // 停止
  abstract stop(): Promise<void>;
}
