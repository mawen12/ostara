# Endpoint API

```markdown
| URI                                                  | Param                                | Desc                 |
| ---------------------------------------------------- | ------------------------------------ | -------------------- |
| `actuator/beans?instanceId=<instanceId>`             | -                                    | get beans            |
| `cache/instance/<instanceId>/all`                    | -                                    | evict all caches     |
| `cache/instance/<instanceId>/<cacheName>`            | -                                    | evict cache          |
| `cache/instance/<instanceId>/bluk`                   | `{data: {cacheNames: <cacheNames>}}` | evict bulk caches    |
| `cache/instance/<instanceId>`                        |                                      | get caches           |
| `cache/instance/<instanceId>/<cacheName>/statistics` |                                      | get cache statistics |

| `actuator/env?instanceId=<instanceId>` | | get env |
| `actuator/flyway?instanceId=<instanceId>` | | get flyway |
| `actuator/health?instanceId=<instanceId>` | | get health |
| `instances/health/update/<instanceId>` | | update instances health |
| `instances/<instanceId>/httpRequestStatistics` | | get http request statistics |
| `actuator/info?instanceId=<instanceId>` | | get into |
| `actuator/integrationgraph?instanceId=<instanceId>` | | get integration graph |
| `actuator/liquibase?instanceId=<instanceId>` | | get liquibase |
| `logger/instance/<instanceId>` | | get loggers |
| `logger/instance/<instanceId>/<loggerName>` | `{ params: { level: <level> } }` | set logger level |
| `actuator/mappings?instanceId=<instanceId>` | | get mappings |
| `actuator/metrics/instanceId=<instanceId>` | | get metrics |
| `actuator/metrics/<name>?instanceId=<instanceId>` | | get metric detail |
| `instances/<instanceId>/properties` | | get properties |
| `actuator/quartz?instanceId=<instanceId>` | | get quartz |
```
