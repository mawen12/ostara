import { Entity } from 'renderer/entity/entity';
import { InstanceBean } from 'renderer/apis/requests/instance/beans/getInstanceBeans';
import InstanceBeanDetails from 'renderer/pages/navigator/instance/beans/components/InstanceBeanDetails';
import { GRAPH_ID } from '../actions';

// 实例Bean实体，映射 Spring Bean
export const instanceBeanEntity: Entity<InstanceBean> = {
  // id
  id: 'instanceBean',
  // 展示列
  columns: [
    // 名称
    {
      id: 'name',
      type: 'Text',
      labelId: 'name',
      width: 250,
    },
    // 包名
    {
      id: 'package',
      type: 'Text',
      labelId: 'package',
      width: 250,
    },
    // Bean 范围
    {
      id: 'scope',
      type: 'Label',
      labelId: 'scope',
      width: 125,
      getColor: () => 'default',
    },
  ],
  // 操作
  actions: [
    // 展示图表图标
    {
      id: GRAPH_ID,
      icon: 'MediationOutlined',
      labelId: 'showGraph',
    },
  ],
  massActions: [],
  globalActions: [],
  // 列操作，展示详情
  rowAction: {
    type: 'Details',
    Component: InstanceBeanDetails,
  },
  // 默认排序
  defaultOrder: [
    // 包名正序
    {
      id: 'package',
      direction: 'asc',
    },
    // 名称正序
    {
      id: 'name',
      direction: 'asc',
    },
  ],
  // 分页
  paging: true,
  // 获取Id，返回类型.名称的格式
  getId: (item) => `${item.type}.${item.name}`,
  // 返回锚点
  getAnchor: (item) => item.name,
  // getGrouping: (item) => item.package,
  // groupingTreeSeparator: '.',
  // 数据过滤
  filterData: (data, filter) =>
    data.filter(
      (item) =>
        item.name?.toLowerCase().includes(filter.toLowerCase()) ||
        item.package?.toLowerCase().includes(filter.toLowerCase()) ||
        item.type?.toLowerCase().includes(filter.toLowerCase())
    ),
};
