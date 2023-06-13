import { Entity } from 'renderer/entity/entity';
import { DELETE_ID, DOWNLOAD_ID, REQUEST_ID } from '../actions';
import { FormattedMessage } from 'react-intl';
import { EnrichedInstanceHeapdumpReferenceRO } from '../../apis/requests/instance/heapdumps/getInstanceHeapdumpReferences';
import { formatBytes } from '../../utils/formatUtils';
import { isNumber } from 'lodash';

// 实例堆转存引用实体
export const instanceHeapdumpReferencesEntity: Entity<EnrichedInstanceHeapdumpReferenceRO> = {
  id: 'instanceHeapdumpReference',
  // 展示列
  columns: [
    // 创建时间
    {
      id: 'creationTime',
      type: 'Date',
      labelId: 'requestTime',
    },
    // 状态
    {
      id: 'status',
      type: 'Label',
      labelId: 'status',
      getTooltip: (item) => (item.status === 'FAILED' ? item.error : undefined),
      getColor: (item) => {
        switch (item.status) {
          case 'PENDING_DOWNLOAD':
            return 'default';
          case 'DOWNLOADING':
            return 'info';
          case 'READY':
            return 'success';
          case 'FAILED':
            return 'error';
          default:
            return 'default';
        }
      },
      getText: (item) => {
        switch (item.status) {
          case 'PENDING_DOWNLOAD':
            return <FormattedMessage id={'pending'} />;
          case 'DOWNLOADING':
            return <FormattedMessage id={'downloading'} />;
          case 'READY':
            return <FormattedMessage id={'ready'} />;
          case 'FAILED':
            return <FormattedMessage id={'failed'} />;
          default:
            return <FormattedMessage id={'unknown'} />;
        }
      },
    },
    // 文件大小
    {
      id: 'size',
      type: 'CustomText',
      labelId: 'size',
      getText: (item) => {
        switch (item.status) {
          case 'DOWNLOADING':
            return isNumber(item.size) && isNumber(item.bytesRead)
              ? `${formatBytes(item.bytesRead)} / ${formatBytes(item.size)} (${Math.round(
                  (item.bytesRead / item.size) * 100
                )}%)`
              : '';
          case 'READY':
            return isNumber(item.size) ? formatBytes(item.size) : '';
          default:
            return '';
        }
      },
    },
  ],
  // 操作
  actions: [
    // 下载文件
    {
      id: DOWNLOAD_ID,
      labelId: 'download',
      icon: 'DownloadOutlined',
      isDisabled: (item) => {
        if (item.status !== 'READY') {
          return <FormattedMessage id={'heapdumpNotReady'} />;
        }
        return false;
      },
    },
    // 删除文件
    {
      id: DELETE_ID,
      labelId: 'delete',
      icon: 'DeleteOutlined',
      isDisabled: (item) => item.status !== 'READY' && item.status !== 'FAILED',
    },
  ],
  massActions: [],
  // 全局操作
  globalActions: [
    // 堆转存
    {
      id: REQUEST_ID,
      labelId: 'requestHeapdump',
      icon: 'BrowserUpdatedOutlined',
    },
  ],
  // 顺序
  defaultOrder: [
    // 创建时间倒序
    {
      id: 'creationTime',
      direction: 'desc',
    },
  ],
  // 分页
  paging: true,
  getId: (item) => item.id,
  // 数据过滤
  filterData: (data, filter) => data.filter((item) => item.status?.toLowerCase().includes(filter.toLowerCase())),
};
