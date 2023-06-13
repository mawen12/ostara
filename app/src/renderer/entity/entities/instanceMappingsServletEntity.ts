import { Entity } from 'renderer/entity/entity';
import { EnrichedMappingsServlet } from '../../apis/requests/instance/mappings/getInstanceMappingsServlets';
import MappingsServletDetails from '../../pages/navigator/instance/mappings/components/MappingsServletDetails';

// 实例 Mappings Servlet 实体，映射 Spring Sevlets
export const instanceMappingsServletEntity: Entity<EnrichedMappingsServlet> = {
  id: 'instanceMappingsServlet',
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
  rowAction: {
    type: 'Details',
    Component: MappingsServletDetails,
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
