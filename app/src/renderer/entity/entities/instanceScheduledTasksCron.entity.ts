import { Entity } from 'renderer/entity/entity';
import { ScheduledTasksActuatorResponse$Cron } from '../../../common/generated_definitions';

// 实例调度任务表达式实体，映射 Spring @Scheduled
export const instanceScheduledTasksCronEntity: Entity<ScheduledTasksActuatorResponse$Cron> = {
  id: 'instanceScheduledTasksCron',
  columns: [
    // 执行目标
    {
      id: 'runnable.target',
      type: 'Text',
      labelId: 'target',
      width: '100%',
    },
    // 表达式
    {
      id: 'expression',
      type: 'Cron',
      labelId: 'expression',
      getTooltip: (item) => item.expression,
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
    data.filter((item) => item.runnable?.target?.toLowerCase().includes(filter.toLowerCase())),
};
