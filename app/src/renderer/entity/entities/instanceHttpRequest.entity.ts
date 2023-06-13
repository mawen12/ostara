import { Entity } from 'renderer/entity/entity';
import InstanceHttpRequestDetails from 'renderer/pages/navigator/instance/http-requests/components/InstanceHttpRequestDetails';
import { InstanceHttpRequestStatisticsRO } from '../../../common/generated_definitions';

export const HTTPS_REQUESTS_TIME_ROUND = 5;

// 实例 Http 请求实体，映射 Spring Http 请求
export const instanceHttpRequestEntity: Entity<InstanceHttpRequestStatisticsRO> = {
  id: 'instanceHttpRequest',
  columns: [
    // 路径
    {
      id: 'uri',
      type: 'Text',
      labelId: 'uri',
      width: '100%',
    },
    // 请求总数
    {
      id: 'count',
      type: 'Number',
      labelId: 'count',
      width: '150px',
    },
    // 请求最大响应时间
    {
      id: 'max',
      type: 'Number',
      labelId: 'maxTime',
      width: '150px',
      round: HTTPS_REQUESTS_TIME_ROUND,
    },
    // 请求累计耗时
    {
      id: 'totalTime',
      type: 'Number',
      labelId: 'totalTime',
      width: '150px',
      round: HTTPS_REQUESTS_TIME_ROUND,
    },
  ],
  actions: [],
  massActions: [],
  globalActions: [],
  // 行操作，展示详情
  rowAction: {
    type: 'Details',
    Component: InstanceHttpRequestDetails,
  },
  // 排序
  defaultOrder: [
    // uri 倒序
    {
      id: 'uri',
      direction: 'asc',
    },
  ],
  paging: true,
  getId: (item) => item.uri,
  // 数据查询
  filterData: (data, filter) => data.filter((item) => item.uri?.toLowerCase().includes(filter.toLowerCase())),
};
