import { Entity } from 'renderer/entity/entity';
import { EnvProperty } from 'renderer/apis/requests/instance/env/getInstanceEnvProperties';
import { COPY_ID } from 'renderer/entity/actions';

// 实例环境实体，映射 Spring Environment
export const instanceEnvEntity: Entity<EnvProperty> = {
  // id
  id: 'instanceEnv',
  // 展示列
  columns: [
    // 键
    {
      id: 'name',
      type: 'Text',
      labelId: 'name',
      width: 300,
      getTooltip: (item) => item.origin,
    },
    // 值
    {
      id: 'value',
      type: 'Text',
      labelId: 'value',
      width: 300,
    },
  ],
  // 操作
  actions: [
    // 复制
    {
      id: COPY_ID,
      labelId: 'copy',
      icon: 'ContentCopyOutlined',
    },
  ],
  massActions: [
    {
      id: COPY_ID,
      labelId: 'copy',
      icon: 'ContentCopyOutlined',
    },
  ],
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
  paging: false,
  getId: (item) => `${item.name}-${item.source}`,
  // 数据过滤
  filterData: (data, filter) =>
    data.filter(
      (item) =>
        item.name?.toLowerCase().includes(filter.toLowerCase()) ||
        item.value?.toLowerCase().includes(filter.toLowerCase())
    ),
};
