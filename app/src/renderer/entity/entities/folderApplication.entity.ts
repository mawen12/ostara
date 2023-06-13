import { Entity } from 'renderer/entity/entity';
import TableCellDataHealthStatus from 'renderer/components/table/data/custom/TableCellDataHealthStatus';
import { generatePath } from 'react-router-dom';
import { urls } from 'renderer/routes/urls';
import { ApplicationRO } from '../../../common/generated_definitions';
import { getItemDisplayName } from '../../utils/itemUtils';

// 文件夹应用实体
export const folderApplicationEntity: Entity<ApplicationRO> = {
  // id
  id: 'folderApplication',
  // 展示列
  columns: [
    {
      // 别名
      id: 'alias',
      type: 'CustomText',
      labelId: 'name',
      getText: (item) => getItemDisplayName(item),
    },
    {
      // 健康状态
      id: 'health.status',
      type: 'Custom',
      labelId: 'healthStatus',
      Component: TableCellDataHealthStatus,
    },
    {
      // 最后更新时间
      id: 'health.lastUpdateTime',
      type: 'Date',
      labelId: 'lastUpdateTime',
    },
    {
      // 状态最后变更时间
      id: 'health.lastStatusChangeTime',
      type: 'Date',
      labelId: 'lastChangeTime',
    },
  ],
  actions: [],
  massActions: [],
  globalActions: [],
  // 列操作
  rowAction: {
    // 跳转到应用详情
    type: 'Navigate',
    getUrl: (item) => generatePath(urls.application.url, { id: item.id }),
  },
  // 默认排序
  defaultOrder: [
    {
      // 名称正序
      id: 'name',
      direction: 'asc',
    },
  ],
  // 分页
  paging: true,
  // 获取Id
  getId: (item) => item.id,
  // 数据过滤
  filterData: (data, filter) => data.filter((item) => item.alias?.toLowerCase().includes(filter.toLowerCase())),
};
