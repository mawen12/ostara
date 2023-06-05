import ElectronStore from 'electron-store';

// 
export const defaults = {
  /**
   * Whether Sentry error reporting is enabled or not.
   */
  // Sentry 是否开启错误报告
  errorReportingEnabled: true,
  /**
   * Whether auto-updates are enabled or not.
   */
  // 是否打开自动更新
  autoUpdateEnabled: true,

  // 最后更新校验时间
  lastUpdateCheckTime: 0,
};

// 定义不可扩展类型，该类型为 defaults
// 参考：https://stackoverflow.com/questions/44884838/what-is-const-type-pattern-in-typescript
export type Configuration = typeof defaults;

export const configurationStore = new ElectronStore<Configuration>({
  name: 'boost_configuration',
  defaults,
});
