import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSubscribeToEvent } from 'renderer/apis/requests/subscriptions/subscribeToEvent';
import { IpcRendererEvent } from 'electron';
import { useUpdateEffect } from 'react-use';
import { UpdateInfo } from 'electron-updater';
import { isMac } from '../utils/platformUtils';
import { LATEST_RELEASE_URL } from '../constants/ui';
import semverGte from 'semver/functions/gte';

// 定义不可扩展类型 应用更新下载方式，分为内置或外置
export type AppUpdatesDownloadType = 'external' | 'internal';

// 定义不可扩展类型 应用更新上下文属性
export type AppUpdatesContextProps = {
  autoUpdateSupported: boolean; // 是否支持自动更新
  autoUpdateEnabled: boolean; // 是否开启自动更新
  setAutoUpdateEnabled: (autoUpdateEnabled: boolean) => void;
  newVersionInfo: UpdateInfo | undefined; // 新版本信息
  newVersionDownloaded: UpdateInfo | undefined; // 新版本是否已下载
  checkForUpdates: () => Promise<UpdateInfo | undefined>; // 异步校验更新
  downloadUpdate: () => AppUpdatesDownloadType; // 下载更新
  installUpdate: () => void; // 安装更新
};

// 应用更新上下文
const AppUpdatesContext = React.createContext<AppUpdatesContextProps>(undefined!);

interface AppUpdatesProviderProps extends PropsWithChildren<any> {}

// 应用更新提供器
const AppUpdatesProvider: FunctionComponent<AppUpdatesProviderProps> = ({ children }) => {
  const autoUpdateSupported = useMemo<boolean>(() => isMac, []);// 如果是 mac 系统，则支持应用自动更新
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState<boolean>(window.configurationStore.isAutoUpdateEnabled());
  const [newVersionInfo, setNewVersionInfo] = useState<UpdateInfo | undefined>(undefined);
  const [newVersionDownloaded, setNewVersionDownloaded] = useState<UpdateInfo | undefined>(undefined);

  useUpdateEffect(() => {
    window.configurationStore.setAutoUpdateEnabled(autoUpdateEnabled);
  }, [autoUpdateEnabled]);

  useEffect(() => {
    (async () => {
      const updateInfo = await window.appUpdater.checkForUpdates();
      if (updateInfo) {
        setNewVersionInfo(updateInfo);
      }
    })();
  }, []);

  const subscribeToUpdateAvailableState = useSubscribeToEvent();
  // 使用 Effect 获取未订阅信息
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    // 异步请求
    (async () => {
      unsubscribe = await subscribeToUpdateAvailableState.mutateAsync({
        event: 'app:updateAvailable',
        listener: (event: IpcRendererEvent, updateInfo: UpdateInfo) => {
          setNewVersionInfo(updateInfo);
        },
      });
    })();
    return () => {
      unsubscribe?.();
    };
  }, []);

  const subscribeToUpdateDownloadedState = useSubscribeToEvent();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    (async () => {
      unsubscribe = await subscribeToUpdateDownloadedState.mutateAsync({
        event: 'app:updateDownloaded',
        listener: (event: IpcRendererEvent, updateInfo: UpdateInfo) => {
          setNewVersionDownloaded(updateInfo);
        },
      });
    })();
    return () => {
      unsubscribe?.();
    };
  }, []);

  // 校验更新回调方法
  const checkForUpdates = useCallback(async (): Promise<UpdateInfo | undefined> => {
    const updateInfo = await window.appUpdater.checkForUpdates();
    const appVersion = await window.ui.getAppVersion();
    
    // 如果更新信息不存在，或者当前版本高于更新版本，则返回
    if (!updateInfo || semverGte(appVersion, updateInfo.version)) {
      return undefined;
    }
    // 更新新版本信息
    setNewVersionInfo(updateInfo);
    return updateInfo;
  }, [setNewVersionInfo]);

  // 下载更新回调方法
  const downloadUpdate = useCallback((): AppUpdatesDownloadType => {
    // 如果支持自动更新，则下载更新
    if (autoUpdateSupported) {
      window.appUpdater.downloadUpdate();
      return 'internal';
    }
    // 在窗口打开最新发布的连接
    window.open(LATEST_RELEASE_URL, '_blank');
    return 'external';
  }, [autoUpdateSupported]);

  // 安装更新回调方法
  const installUpdate = useCallback((): void => {
    // 如果不支持自动安装，则返回
    if (!autoUpdateSupported) {
      return;
    }
    // 退出并安装更新
    window.appUpdater.quitAndInstall();
  }, [autoUpdateSupported]);

  return (
    <AppUpdatesContext.Provider
      value={{
        autoUpdateSupported,
        autoUpdateEnabled,
        setAutoUpdateEnabled,
        newVersionInfo,
        newVersionDownloaded,
        checkForUpdates,
        downloadUpdate,
        installUpdate,
      }}
    >
      {children}
    </AppUpdatesContext.Provider>
  );
};

const useAppUpdates = (): AppUpdatesContextProps => {
  const context = useContext(AppUpdatesContext);
  // 如果上下文不存在，则报错
  if (!context) throw new Error('AppUpdatesContext must be used inside AppUpdatesProvider');

  return context;
};

export { AppUpdatesContext, AppUpdatesProvider, useAppUpdates };
