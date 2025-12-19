# App Architecture

## App.tsx

在入口的 `App.tsx` 中定义了项目的结构。

```
<MemoryRouter>
  <QueryClientProvider client={queryClient}>
    <StompProvider>
      <SettingsProvider>
        <SettingsContext.Consumer>
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
```

## Memory Router

使用 `react-router-dom` 实现路由，并指定路由规则，基于内存来路由。

## QueryClientProvider

使用 `tanstack/react-query` 来执行api请求

## StompProvider

使用 `stompjs` 来建立 websocket 通信

## SettingsProvider

对应 `SettingsContext`，维护了应用配置信息，信息来源于两处：后端配置（Api）、浏览器本地存储（LocalStorage）。

并使用定时心跳检测后端应用状态。

## AppUpdatesProvider

对应 `AppUpdatesContext`，提供了检测应用更新的能力。

## AnalyticsProvider

对应 `AnalyticsContext`，使用 `@amplitude/analytics-browser` 来收集应用信息。

## IntlProvider

使用 `react-intl` 来实现 `i18n`

## LocalizationProvider

使用 `@mui/x-date-pickers` 实现本地化实现的相关日期组件。

## ThemeConfig

实现主题的切换。

## ItemsProvider

对应 `ItemsContext`，提供访问所有应用的业务信息，有 `Folder`, `Application`, `Agent`, `Instance`。以及对应的增删该查。

1.在页面加载时，使用 `react-query` 从后端读取数据并加载到内存中。
2.暴露提供 `addItem`, `addItems`, `getItem` 等更新内存数据的方法。
3.使用 `stompjs` 从后端读取 `items` 相关事件，来更新内存数据。
  3.1 `/topic/instanceCreation` InstanceCreatedEventMessage
    如果 Instance 是 discovered ，那么就加入到 `items`
  3.2 `/topic/instanceUpdate`
    如果 Instance 是 discovered, 那么就更新 `items`
  3.3 `/topic/instanceDeletion`
    从 `items` 中删除该 instance
  3.4 `/topic/instanceHealth` InstanceHealthChangedEventMessage
    更新该 instance 的 health
  3.5 `/topic/instanceHostname`
    更新该 instance 的 hostname
  3.6 `/topic/instanceMetadata`
    更新该 instance 的 metadata

## NotistackProvider

提供消息通知。

## NiceModal

使用 `@ebay/nice-modal-react` 实现模态框通知。

## ApiErrorManager

对应 API 请求的错误信息进行展示

## AnalyticsEventsManager

统计应用事件信息。

## AppUpdatesManager

处理应用更新业务逻辑。

## NewVersionManager

处理应用有新版本时的逻辑，并统计当前版本

## NotificationsManager

用于处理通知跳转时的操作。
