import { ipcRenderer } from 'electron';
import { Configuration } from './store';

// 对外提供支持泛型的操作存储方法
export const configurationStoreBridge: ConfigurationBridge<keyof Configuration> = {
  get<T>(key: string): T {
    return ipcRenderer.sendSync('configurationStore:get', key);
  },
  set<T>(property: string, val: T) {
    ipcRenderer.send('configurationStore:set', property, val);
  },
  has(key: string): boolean {
    return ipcRenderer.sendSync('configurationStore:has', key);
  },
  delete(key: string): void {
    ipcRenderer.send('configurationStore:delete', key);
  },
  reset(key: string): void {
    ipcRenderer.send('configurationStore:reset', key);
  },
  clear(): void {
    ipcRenderer.send('configurationStore:clear');
  },
  isErrorReportingEnabled(): boolean {
    return ipcRenderer.sendSync('configurationStore:get', 'errorReportingEnabled');
  },
  setErrorReportingEnabled(enabled: boolean): void {
    ipcRenderer.send('configurationStore:set', 'errorReportingEnabled', enabled);
  },
  isAutoUpdateEnabled(): boolean {
    return ipcRenderer.sendSync('configurationStore:get', 'autoUpdateEnabled');
  },
  setAutoUpdateEnabled(enabled: boolean): void {
    ipcRenderer.send('configurationStore:set', 'autoUpdateEnabled', enabled);
  },
};
