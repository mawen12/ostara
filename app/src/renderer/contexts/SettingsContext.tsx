import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LocaleInfo } from 'renderer/lang/lang';
import locales from 'renderer/lang';
import { useSubscribeToEvent } from 'renderer/apis/requests/subscriptions/subscribeToEvent';
import { IpcRendererEvent } from 'electron';
import { ElectronTheme, ThemeSource } from 'infra/ui/models/electronTheme';
import { useGetThemeSource } from 'renderer/apis/requests/ui/getThemeSource';
import { useSetThemeSource } from 'renderer/apis/requests/ui/setThemeSource';
import { useGetTheme } from 'renderer/apis/requests/ui/getTheme';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useLocation, useNavigate } from 'react-router-dom';
import { urls } from '../routes/urls';
import { useUpdateEffect } from 'react-use';

// 设置上下文的属性信息
export type SettingsContextProps = {
  developerMode: boolean; // 是否为开发模式
  daemonHealthy: boolean; // daemon 是否健康
  themeSource: ThemeSource; // 主题源
  setThemeSource: (themeSource: ThemeSource) => void; // 设置主题源
  darkMode: boolean; // 是否为黑暗模式
  setDarkMode: (darkMode: boolean) => void; // 设置黑暗模式
  localeInfo: LocaleInfo; // 地区信息
  setLocale: (locale: string) => void; // 设置地区信息
  isRtl: boolean;
  analyticsEnabled: boolean; // 是否启用分析
  setAnalyticsEnabled: (analyticsEnabled: boolean) => void; // 设置启用分析开关
  errorReportingEnabled: boolean; // 是否打开错误报告
  errorReportingChanged: boolean; // 是否变更错误报告
  setErrorReportingEnabled: (errorReportingEnabled: boolean) => void; // 设置错误报告开关
};

// 创建需要共享的配置上下文
const SettingsContext = React.createContext<SettingsContextProps>(undefined!);

interface SettingsProviderProps extends PropsWithChildren<any> {}

// 配置生产者
const SettingsProvider: FunctionComponent<SettingsProviderProps> = ({ children }) => {
  // 导航
  const navigate = useNavigate();
  // 路径
  const { pathname } = useLocation();
  // 是否为开发模式
  const developerMode = useMemo<boolean>(
    () => window.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true',
    []
  );
  
  // state: daemon 是否健康
  const [daemonHealthy, setDaemonHealthy] = useState<boolean>(window.daemonHealthy());
  // local state: 主题源
  const [themeSource, setThemeSourceInternal] = useLocalStorageState<ThemeSource>('themeSource', 'system');
  // local state: 是否为黑暗模式
  const [darkMode, setDarkMode] = useLocalStorageState<boolean>('darkMode', true);
  // local state: 区域位置
  const [locale, setLocaleInternal] = useLocalStorageState<string>('locale', 'en');
  // memo state: 如果区域位置未发生变化，则组件渲染不执行该函数
  const localeInfo = useMemo<LocaleInfo>(() => locales[locale], [locale]);
  // memo state: 如果位置信息未发生变化，则组件渲染不执行该函数
  const isRtl = useMemo<boolean>(() => localeInfo.direction === 'rtl', [localeInfo]);
  // local state: 是否开启分析
  const [analyticsEnabled, setAnalyticsEnabled] = useLocalStorageState<boolean>('analyticsEnabled', true);
  // memo state: 直接获取配置中的错误报告开关
  const errorReportingInitialState = useMemo<boolean>(() => window.configurationStore.isErrorReportingEnabled(), []);
  // state: 错误报告开关
  const [errorReportingEnabled, setErrorReportingEnabled] = useState<boolean>(errorReportingInitialState);
  // memo state: 当错误报错开关值变更，则记录值，否则组件渲染时跳过该函数
  const errorReportingChanged = useMemo<boolean>(
    () => errorReportingEnabled !== errorReportingInitialState,
    [errorReportingEnabled]
  );
  // 当依赖值发生变更时，才会执行该函数调用
  useUpdateEffect(() => {
    window.configurationStore.setErrorReportingEnabled(errorReportingEnabled);
  }, [errorReportingEnabled]);
  // 如果 daemon 健康，那么将展示项目主页，否则展示 DaemonUnhealthy 
  useEffect(() => {
    const newPathname = daemonHealthy ? urls.home.url : urls.daemonUnhealthy.url;
    if (newPathname !== pathname) {
      navigate(newPathname);
    }
  }, [daemonHealthy]);
  
  const getThemeState = useGetTheme();

  // 执行异步请求，获取主题，并设置暗黑模式
  useEffect(() => {
    (async () => {
      try {
        const updatedTheme = await getThemeState.mutateAsync({});
        setDarkMode(updatedTheme.shouldUseDarkColors);
      } catch (e) {}
    })();
  }, []);

  const getThemeSourceState = useGetThemeSource();

  // 执行异步请求，获取最新的主题源，并设置值
  useEffect(() => {
    (async () => {
      try {
        const updatedThemeSource = await getThemeSourceState.mutateAsync({});
        setThemeSourceInternal(updatedThemeSource);
      } catch (e) {}
    })();
  }, []);

  const setThemeSourceState = useSetThemeSource({ refetchNone: true });

  // 当依赖发生变更时，更新值
  const setThemeSource = useCallback(
    (newThemeSource: ThemeSource): void => {
      setThemeSourceInternal(newThemeSource);
      setThemeSourceState.mutate({ themeSource: newThemeSource });
    },
    [setLocaleInternal]
  );

  const setLocale = useCallback(
    (newLocale: string): void => {
      if (locales[newLocale]) {
        setLocaleInternal(newLocale);
      }
    },
    [setLocaleInternal]
  );

  const subscribeToDaemonUnhealthyState = useSubscribeToEvent();

  // 在组件卸载时，发送 app:daemonUnhealthy 事件，并添加回调方法，标记daemon为不健康
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    (async () => {
      unsubscribe = await subscribeToDaemonUnhealthyState.mutateAsync({
        event: 'app:daemonUnhealthy',
        listener: (event: IpcRendererEvent) => {
          setDaemonHealthy(false);
        },
      });
    })();
    return () => {
      unsubscribe?.();
    };
  }, []);

  const subscribeToDaemonHealthyState = useSubscribeToEvent();

  // 在组件卸载时，发送 app:daemonHealthy 事件，并添加回调方法，标记daemon为健康
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    (async () => {
      unsubscribe = await subscribeToDaemonHealthyState.mutateAsync({
        event: 'app:daemonHealthy',
        listener: (event: IpcRendererEvent) => {
          setDaemonHealthy(true);
        },
      });
    })();
    return () => {
      unsubscribe?.();
    };
  }, []);

  const subscribeToThemeEventsState = useSubscribeToEvent();
  // 在组件卸载时，发送 app:themeUpdated 事件，并添加回调方法，标记暗黑模式
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    (async () => {
      unsubscribe = await subscribeToThemeEventsState.mutateAsync({
        event: 'app:themeUpdated',
        listener: (event: IpcRendererEvent, data: ElectronTheme) => {
          setDarkMode(data.shouldUseDarkColors);
        },
      });
    })();
    return () => {
      unsubscribe?.();
    };
  }, []);

  // 向子组件共享项目配置项，并将子组件嵌套
  return (
    <SettingsContext.Provider
      value={{
        developerMode,
        daemonHealthy,
        themeSource,
        setThemeSource,
        darkMode,
        setDarkMode,
        localeInfo,
        setLocale,
        isRtl,
        analyticsEnabled,
        setAnalyticsEnabled,
        errorReportingEnabled,
        errorReportingChanged,
        setErrorReportingEnabled,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// 提供共享项目配置上下文的入口
const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('SettingsContext must be used inside SettingsProvider');

  return context;
};

export { SettingsContext, SettingsProvider, useSettings };
