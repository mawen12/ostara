import { Entity } from 'renderer/entity/entity';
import { EnrichedQuartzJob } from '../../apis/requests/instance/quartz/getInstanceQuartzJobs';
import QuartzJobDetails from '../../pages/navigator/instance/quartz/components/QuartzJobDetails';

// 实例 Quartz Job 实例，映射 Spring Quartz Job
export const instanceQuartzJobEntity: Entity<EnrichedQuartzJob> = {
  id: 'instanceQuartzJob',
  columns: [
    // 分组
    {
      id: 'group',
      type: 'Text',
      labelId: 'group',
    },
    // 名称
    {
      id: 'name',
      type: 'Text',
      labelId: 'name',
    },
  ],
  actions: [],
  massActions: [],
  globalActions: [],
  rowAction: {
    type: 'Details',
    Component: QuartzJobDetails,
  },
  defaultOrder: [
    {
      id: 'group',
      direction: 'asc',
    },
    {
      id: 'name',
      direction: 'asc',
    },
  ],
  paging: true,
  getId: (item) => item.name,
  filterData: (data, filter) =>
    data.filter(
      (item) =>
        item.name?.toLowerCase().includes(filter.toLowerCase()) ||
        item.group?.toLowerCase().includes(filter.toLowerCase())
    ),
};
