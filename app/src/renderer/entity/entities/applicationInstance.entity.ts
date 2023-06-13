import { Entity } from 'renderer/entity/entity';
import TableCellDataHealthStatus from 'renderer/components/table/data/custom/TableCellDataHealthStatus';
import { generatePath } from 'react-router-dom';
import { urls } from 'renderer/routes/urls';
import { InstanceRO } from '../../../common/generated_definitions';
import { getItemDisplayName } from '../../utils/itemUtils';

// 应用实例实体
export const applicationInstanceEntity: Entity<InstanceRO> = {
  // id
  id: 'applicationInstance',
  // 展示列
  columns: [
    // 别名
    {
      id: 'alias',
      type: 'CustomText',
      labelId: 'name',
      getText: (item) => getItemDisplayName(item),
      getTooltip: (item) => item.actuatorUrl,
    },
    // 健康度
    {
      id: 'health.status',
      type: 'Custom',
      labelId: 'healthStatus',
      getTooltip: (item) => item.health?.statusText,
      Component: TableCellDataHealthStatus,
    },
    // 最后更新时间
    {
      id: 'health.lastUpdateTime',
      type: 'Date',
      labelId: 'lastUpdateTime',
    },
    // 状态最后变更时间
    {
      id: 'health.lastStatusChangeTime',
      type: 'Date',
      labelId: 'lastChangeTime',
    },
  ],
  // 不支持操作
  actions: [],
  massActions: [],
  // 不支持全局操作
  globalActions: [],
  // 列操作
  rowAction: {
    // 跳转到应用实例
    type: 'Navigate',
    getUrl: (item) => generatePath(urls.instance.url, { id: item.id }),
  },
  // 默认排序
  defaultOrder: [
    // 名称正序
    {
      id: 'name',
      direction: 'asc',
    },
  ],
  // 分页
  paging: true,
  // 获取id，返回元素的id
  getId: (item) => item.id,
  // 过滤器
  filterData: (data, filter) => data.filter((item) => item.alias?.toLowerCase().includes(filter.toLowerCase())),
};
