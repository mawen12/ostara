import { Entity } from 'renderer/entity/entity';
import { EnrichedMappingsDispatcherServletOrHandler } from '../../apis/requests/instance/mappings/getInstanceMappingsDispatcherServlets';

// 实例映射 Mappings Dispatcher Servlets 实体，映射 Spring Dispatcher Servlets 
export const instanceMappingsDispatcherServletOrHandlerEntity: Entity<EnrichedMappingsDispatcherServletOrHandler> = {
  id: 'instanceMappingsDispatcherServletOrHandler',
  columns: [
    // url
    {
      id: 'url',
      type: 'Text',
      labelId: 'url',
    },
    // 请求方法
    {
      id: 'method',
      type: 'Text',
      labelId: 'method',
      width: 100,
    },
    // 生产
    {
      id: 'produce',
      type: 'Text',
      labelId: 'produce',
    },
    // 处理器
    {
      id: 'handler',
      type: 'Text',
      labelId: 'handler',
    },
    // 内容
    {
      id: 'context',
      type: 'Text',
      labelId: 'context',
      width: 125,
    },
  ],
  actions: [],
  massActions: [],
  globalActions: [],
  defaultOrder: [
    {
      id: 'url',
      direction: 'asc',
    },
    {
      id: 'context',
      direction: 'asc',
    },
  ],
  paging: true,
  getId: (item) => `${item.context}_${item.predicate}`,
  filterData: (data, filter) =>
    data.filter(
      (item) =>
        item.url?.toLowerCase().includes(filter.toLowerCase()) ||
        item.method?.toLowerCase().includes(filter.toLowerCase()) ||
        item.produce?.toLowerCase().includes(filter.toLowerCase()) ||
        item.handler?.toLowerCase().includes(filter.toLowerCase()) ||
        item.context?.toLowerCase().includes(filter.toLowerCase())
    ),
};
