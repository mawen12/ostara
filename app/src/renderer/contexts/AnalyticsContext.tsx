import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSettings } from './SettingsContext';
import { AMPLITUDE_API_KEY } from '../constants/ids';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import * as amplitude from '@amplitude/analytics-browser';

// 定义分析事件
export type AnalyticsEvent = {
  name: string; // 事件名称
  properties?: Record<string, any>; // 事件属性
};

// 定义分析上下文属性
export type AnalyticsContextProps = {
  analyticsActive: boolean; // 分析激活开关
  track: (event: AnalyticsEvent) => void; // 跟踪方法
};

// 创建共享的分析上下文
const AnalyticsContext = React.createContext<AnalyticsContextProps>(undefined!);

interface AnalyticsProviderProps extends PropsWithChildren<any> {}

// 函数式组件
const AnalyticsProvider: FunctionComponent<AnalyticsProviderProps> = ({ children }) => {
  // 从配置项获取分析开关、开发者模式开关
  const { analyticsEnabled, developerMode } = useSettings();
  // state: 初始化
  const [initiated, setInitiated] = useState<boolean>(false);
  // state: 待发送的事件，在日志收集组件未初始化完成时，保存到本地
  const [pendingEvents, setPendingEvents] = useState<AnalyticsEvent[]>([]);
  // memo state: 分析开关
  const analyticsActive = useMemo(() => analyticsEnabled && !developerMode, [analyticsEnabled, developerMode]);
  // local state: 设备Id
  const [deviceId, setDeviceId] = useLocalStorageState<string | undefined>('analyticsDeviceId', undefined);
  // memo state: 会话Id
  const sessionId = useMemo<number>(() => Date.now(), []);

  useEffect(() => {
    if (initiated) {
      amplitude.setOptOut(!analyticsActive);
    } else if (analyticsActive) {
      (async () => {
        // 如果设备Id尚未初始化，则使用uuid生成，并设置
        const initDeviceId = deviceId || uuidv4();
        if (initDeviceId !== deviceId) {
          setDeviceId(initDeviceId);
        }
        // 获取应用版本
        const appVersion = await window.ui.getAppVersion();
        // 初始化
        await amplitude.init(AMPLITUDE_API_KEY, undefined, {
          appVersion: appVersion,
          sessionId: sessionId,
          deviceId: initDeviceId,
          disableCookies: true,
          trackingOptions: {
            ipAddress: false,
          },
        });
        setInitiated(true);
      })();
    }
  }, [analyticsActive]);

  const track = useCallback(
    (event: AnalyticsEvent): void => {
      if (!analyticsActive) {
        return;
      }
      if (!initiated) {
        // 当未完成日志收集组件的初始化，则将事件追击到待发送的事件列表中
        setPendingEvents((prev) => [...prev, event]);
        return;
      }
      // 在已激活分析和完成初始化的情况下，开始记录信息
      amplitude.track(event.name, event.properties);
    },
    [analyticsActive, initiated]
  );

  useEffect(() => {
    if (!analyticsActive) {
      return;
    }
    if (!initiated) {
      return;
    }
    // 将待发送的事件，发送给日志收集组件，完成后将事件列表清空
    pendingEvents.forEach((event) => {
      track(event);
    });
    setPendingEvents([]);
  }, [initiated]);

  return (
    // 向子组件共享分析上下文信息项，并将子组件嵌套
    <AnalyticsContext.Provider
      value={{
        analyticsActive,
        track,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

// 提供获取分析上下文的入口
const useAnalytics = (): AnalyticsContextProps => {
  const context = useContext(AnalyticsContext);

  if (!context) throw new Error('AnalyticsContext must be used inside AnalyticsProvider');

  return context;
};

export { AnalyticsContext, AnalyticsProvider, useAnalytics };
