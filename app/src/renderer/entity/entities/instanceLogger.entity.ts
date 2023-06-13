import { Entity } from 'renderer/entity/entity';
import TableCellDataInstanceLoggerLevel from 'renderer/components/table/data/custom/TableCellDataInstanceLoggerLevel';
import { RESET_ID } from 'renderer/entity/actions';
import { EnrichedInstanceLoggerRO } from 'renderer/apis/requests/instance/loggers/getInstanceLoggers';
import { isClassName } from 'renderer/utils/classUtils';
import LoggerCustomFiltersComponent, {
  LoggerCustomFilters,
} from 'renderer/components/item/logger/LoggerCustomFiltersComponent';

// 实例日志实体
export const instanceLoggerEntity: Entity<EnrichedInstanceLoggerRO, LoggerCustomFilters> = {
  id: 'instanceCache',
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
      Component: TableCellDataInstanceLoggerLevel,
    },
  ],
  actions: [
    // 恢复原装
    {
      id: RESET_ID,
      labelId: 'reset',
      icon: 'RotateLeftOutlined',
      isDisabled: (item) => item.name === 'ROOT' || !item.configuredLevel,
    },
  ],
  massActions: [],
  globalActions: [],
  defaultOrder: [
    {
      id: 'name',
      direction: 'asc',
    },
  ],
  paging: true,
  getId: (item) => item.name,
  // 数据过滤
  filterData: (data, filter, customFilters) =>
    data.filter(
      (item) =>
        item.name?.toLowerCase().includes(filter.toLowerCase()) &&
        (!customFilters?.configured || !!item.configuredLevel) &&
        (!customFilters?.classes || isClassName(item.name))
    ),
  CustomFiltersComponent: LoggerCustomFiltersComponent,
};
