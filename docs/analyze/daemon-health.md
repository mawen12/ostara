# Daemon Health

## 初始化

SettingsContext

```
const [daemonHealthy, setDaemonHealthy] = useState<boolean>(window.daemonHealthy());
```

## 更新

daemonController

监听来自 Electron 发送的 `app:daemonHealthy` 和 `app:daemonUnhealthy` 事件。
根据事件使用setDaemonHealthy更新。 

daemonController#initializeSubscriptions
daemonController#startHealthCheck

初始化时发送一次，之后每隔1s发送一次。如果健康，则发送 daemon-healthy，反之发送 daemon-unhealty

该健康检查是从前端发送到后端，而非后端推送的。


## 影响

SettingsContext

```
useEffect(() => {
  const newPathname = daemonHealthy ? urls.home.url : urls.daemonUnhealthy.url;
  if (newPathname !== pathname) {
    navigate(newPathname);
  }
}, [daemonHealthy]);
```

当 daemonHealthy 状态变更时，计算新的路径，如果路径不变，则导航到新的路径. `/daemon/unhealthy`

### 实现 doHealthCheck

RestHealthCheckingDaemon
PackagedDemoManager

底层主要通过Rest发送GET请求后端地址，当返回值在[200, 300)之间时，视作成功。
返回值格式为：{
  healthy： boolean,
  message: string
}

成功时返回：
```
{ healthy: true }
```

失败时返回：
```
{ healthy: false, message: `Received status code ${response.status}` }
```

异常时返回:
```
{ healthy: false, message: err.message }
```

未知错误时返回
```
{ healthy: false, message: `Unknown error: ${err}` }
```
