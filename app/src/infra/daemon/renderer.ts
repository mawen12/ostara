// 提供给 renderer process 的查看守护进行信息的操作入口
import { ipcRenderer } from 'electron';

// 定义获取守护进程地址的函数
export const daemonAddressSupplier = (): string => ipcRenderer.sendSync('daemon:address');
// 定义获取守护进行Websocket地址的函数
export const daemonWsAddressSupplier = (): string => ipcRenderer.sendSync('daemon:wsAddress');
// 定义获取守护进行是否健康的函数
export const daemonHealthySupplier = (): boolean => ipcRenderer.sendSync('daemon:healthy');
