// React 界面入口
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ThemeConfig from 'renderer/theme/ThemeConfig';
import NiceModal from '@ebay/nice-modal-react';
import NotistackProvider from 'renderer/components/snackbar/NotistackProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import useCreateQueryClient from 'renderer/apis/useCreateQueryClient';
import { SettingsContext, SettingsProvider } from 'renderer/contexts/SettingsContext';
import Router from 'renderer/routes/routes';
import { StompProvider } from './apis/websockets/StompContext';
import ApiErrorManager from './apis/ApiErrorManager';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import NewVersionManager from './components/managers/NewVersionManager';
import AnalyticsEventsManager from './components/managers/AnalyticsEventsManager';
import AppUpdatesManager from './components/managers/AppUpdatesManager';
import { AppUpdatesProvider } from './contexts/AppUpdatesContext';
import NotificationsManager from './components/managers/NotificationsManager';
import { ItemsProvider } from './contexts/ItemsContext';

export default function App() {
  // 创建查询客户端
  const queryClient = useCreateQueryClient();

  // App 节点下的原生组件（具体的值）
  return (
    // 创建内存路由器，使用内存来存储history，用于在移动端、客户端等不使用url直接访问指定页面的情况
    // 参考：https://blog.csdn.net/sinat_38783046/article/details/120790439
    <MemoryRouter>
      {/**
        *  连接并提供一个 QueryClient 到应用程序中
        */}
      <QueryClientProvider client={queryClient}>
        {/**
         * 
         */}
        <StompProvider>
          {/**
            * 
            */}
          <SettingsProvider>
            {/**
              * 
              */}
            <SettingsContext.Consumer>
              {/**
                * 
                */}
              {({ darkMode, localeInfo }) => (
                <AppUpdatesProvider>
                  <AnalyticsProvider>
                    <IntlProvider
                      locale={localeInfo.locale}
                      messages={localeInfo.messages}
                      onError={(err) => {
                        if (err.code === 'MISSING_TRANSLATION') {
                          console.warn('Missing translation', err.message);
                          return;
                        }
                        throw err;
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeInfo.dateLocalization}>
                        <ThemeConfig
                          isDarkMode={darkMode}
                          isRtl={localeInfo.direction === 'rtl'}
                          localization={localeInfo.materialUiLocalization}
                        >
                          <ItemsProvider>
                            <NotistackProvider>
                              <NiceModal.Provider>
                                <ApiErrorManager />
                                <AnalyticsEventsManager />
                                <AppUpdatesManager />
                                <NewVersionManager />
                                <NotificationsManager />

                                <Router />
                              </NiceModal.Provider>
                            </NotistackProvider>
                          </ItemsProvider>
                        </ThemeConfig>
                      </LocalizationProvider>
                    </IntlProvider>
                  </AnalyticsProvider>
                </AppUpdatesProvider>
              )}
            </SettingsContext.Consumer>
          </SettingsProvider>
        </StompProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
}
