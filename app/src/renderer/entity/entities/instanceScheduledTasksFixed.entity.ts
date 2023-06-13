import { Entity } from 'renderer/entity/entity';
import { ScheduledTasksActuatorResponse$FixedDelayOrRate } from '../../../common/generated_definitions';

// 实例调度任务固定周期实体
export const instanceScheduledTasksFixedEntity: Entity<ScheduledTasksActuatorResponse$FixedDelayOrRate> = {
  id: 'instanceScheduledTasksFixed',
  columns: [
    {
      id: 'runnable.target',
      type: 'Text',
      labelId: 'target',
      width: '100%',
    },
    // 延迟开始
    {
      id: 'initialDelay',
      type: 'Interval',
      labelId: 'initialDelay',
    },
    // 间隔
    {
      id: 'interval',
      type: 'Interval',
      labelId: 'interval',
    },
  ],
  actions: [],
  massActions: [],
  globalActions: [],
  defaultOrder: [
    {
      id: 'runnable.target',
      direction: 'asc',
    },
  ],
  paging: true,
  getId: (item) => item.runnable.target,
  filterData: (data, filter) =>
    data.filter(
      (item) =>
        item.runnable?.target?.toLowerCase().includes(filter.toLowerCase()) ||
        item.initialDelay?.toString().includes(filter.toLowerCase()) ||
        item.interval?.toString().includes(filter.toLowerCase())
    ),
};
