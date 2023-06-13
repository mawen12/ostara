import { Entity } from 'renderer/entity/entity';
import { RESET_ID } from 'renderer/entity/actions';
import { isClassName } from 'renderer/utils/classUtils';
import LoggerCustomFiltersComponent, {
  LoggerCustomFilters,
} from 'renderer/components/item/logger/LoggerCustomFiltersComponent';
import { EnrichedApplicationLoggerRO } from 'renderer/apis/requests/application/loggers/getApplicationLoggers';
import { every, some } from 'lodash';
import TableCellDataApplicationLoggerLevel from 'renderer/components/table/data/custom/TableCellDataApplicationLoggerLevel';

// 应用日志实体
export const applicationLoggerEntity: Entity<EnrichedApplicationLoggerRO, LoggerCustomFilters> = {
  // id
  id: 'instanceCache',
  // 展示列
  columns: [
    // 名称
    {
      id: 'name',
      type: 'Text',
      labelId: 'name',
      width: '100%',
    },
    // 日志级别
    {
      id: 'effectiveLevel',
      type: 'Custom',
      labelId: 'level',
      width: 440,
      Component: TableCellDataApplicationLoggerLevel,
    },
  ],
  // 操作
  actions: [
    // 重置日志级别
    {
      id: RESET_ID,
      labelId: 'reset',
      icon: 'RotateLeftOutlined',
      isDisabled: (item) => item.name === 'ROOT' || every(item.loggers, (logger) => !logger.configuredLevel),
    },
  ],
  massActions: [],
  globalActions: [],
  // 排序
  defaultOrder: [
    // 名称正序
    {
      id: 'name',
      direction: 'asc',
    },
  ],
  // 分页
  paging: true,
  // 获取Id，返回元素的名称
  getId: (item) => item.name,
  // 过滤数据
  filterData: (data, filter, customFilters) =>
    data.filter(
      (item) =>
        item.name?.toLowerCase().includes(filter.toLowerCase()) &&
        (!customFilters?.configured || some(item.loggers, (logger) => !!logger.configuredLevel)) &&
        (!customFilters?.classes || isClassName(item.name))
    ),
  CustomFiltersComponent: LoggerCustomFiltersComponent,
};
