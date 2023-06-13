import { Entity } from 'renderer/entity/entity';
import { EnrichedMappingsServletFilter } from '../../apis/requests/instance/mappings/getInstanceMappingsServletFilters';
import MappingsServletFilterDetails from '../../pages/navigator/instance/mappings/components/MappingsServletFilterDetails';

// 实例 Mappings Servlet Filter，映射 Spring Servlet Filter
export const instanceMappingsServletFilterEntity: Entity<EnrichedMappingsServletFilter> = {
  id: 'instanceMappingsServletFilter',
  columns: [
    // 名称
    {
      id: 'name',
      type: 'Text',
      labelId: 'name',
    },
    // 内容
    {
      id: 'context',
      type: 'Text',
      labelId: 'context',
    },
  ],
  actions: [],
  massActions: [],
  globalActions: [],
  // 行操作
  rowAction: {
    type: 'Details',
    Component: MappingsServletFilterDetails,
  },
  defaultOrder: [
    {
      id: 'name',
      direction: 'asc',
    },
    {
      id: 'context',
      direction: 'asc',
    },
  ],
  paging: true,
  getId: (item) => `${item.context}_${item.name}`,
  filterData: (data, filter) =>
    data.filter(
      (item) =>
        item.name?.toLowerCase().includes(filter.toLowerCase()) ||
        item.context?.toLowerCase().includes(filter.toLowerCase())
    ),
};
