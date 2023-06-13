import { Entity } from 'renderer/entity/entity';
import { EVICT_CACHE_ID, STATISTICS_ID } from 'renderer/entity/actions';
import { EnrichedApplicationCacheRO } from '../../apis/requests/application/caches/getApplicationCaches';
import { FormattedMessage } from 'react-intl';
import { Link } from '@mui/material';
import { ABILITIES_DOCUMENTATION_URL } from '../../constants/ui';

// 应用缓存实体，展示和清理缓存
export const applicationCacheEntity: Entity<EnrichedApplicationCacheRO> = {
  // id
  id: 'applicationCache',
  // 展示列
  columns: [
    // 名称
    {
      id: 'name',
      type: 'Text',
      labelId: 'name',
    },
    // 缓存管理
    {
      id: 'cacheManager',
      type: 'Text',
      labelId: 'cacheManager',
    },
  ],
  // 操作
  actions: [
    // 统计操作
    {
      id: STATISTICS_ID,
      labelId: 'showStatistics',
      icon: 'DonutLargeOutlined',
      isDisabled: (item) => {
        if (!item.hasStatistics) {
          return (
            <>
              <FormattedMessage id={'cacheStatisticsNotAvailable'} /> (
              <Link
                href={'#'}
                onClick={(event) => {
                  event.preventDefault();
                  window.open(ABILITIES_DOCUMENTATION_URL, '_blank');
                }}
              >
                <FormattedMessage id={'readMore'} />
              </Link>
              )
            </>
          );
        }
        return false;
      },
    },
    // 清除缓存操作
    {
      id: EVICT_CACHE_ID,
      labelId: 'evict',
      icon: 'CleaningServicesOutlined',
    },
  ],
  massActions: [
    {
      id: EVICT_CACHE_ID,
      labelId: 'evict',
      icon: 'CleaningServicesOutlined',
    },
  ],
  // 全局操作
  globalActions: [
    // 清理所有缓存
    {
      id: EVICT_CACHE_ID,
      labelId: 'evictAll',
      icon: 'CleaningServicesOutlined',
    },
  ],
  // 默认排序，基于名称的正序
  defaultOrder: [
    {
      id: 'name',
      direction: 'asc',
    },
  ],
  // 分页
  paging: true,
  // 获取Id，返回元素的名称
  getId: (item) => item.name,
  // 数据过滤器
  filterData: (data, filter) =>
    data.filter(
      (item) =>
        item.name?.toLowerCase().includes(filter.toLowerCase()) ||
        item.cacheManager?.toLowerCase().includes(filter.toLowerCase())
    ),
};
