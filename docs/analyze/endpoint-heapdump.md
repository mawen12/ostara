# Endpoint Heapdump

## 描述

提供了下载 Heapdump 的功能.

## 接口

- `InstanceHeapdumpController`

| Uri                                         | Method | Desc                              |
| ------------------------------------------- | ------ | --------------------------------- |
| `instances/heapdumps/{instanceId}`          | Post   | 下载指定 Actuator 的 Heapdump     |
| `instances/heapdumps/download/{instanceId}` | Get    | 从应用下载之前已下载过的 Heapdump |
| `instances/heapdumps/{instanceId}`          | Delete | 删除之前下载的 Heapdump           |

## 表

- `InstanceHeapdumpReference`

- `instance_heapdump_reference`

| Field         | Type      | Desc                                                    |
| ------------- | --------- | ------------------------------------------------------- |
| instance_id   | uuid      | 所属的实例                                              |
| status        | string    | 下载状态 `PENDING_DOWNLOAD, DOWNLOADING, READY, FAILED` |
| path          | string    | 文件所在路径                                            |
| size          | long      | 文件大小                                                |
| download_time | timestamp | 下载日期                                                |
| error         | text      | 错误内容                                                |

## 逻辑
