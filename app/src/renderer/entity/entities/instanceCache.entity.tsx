import { Entity } from 'renderer/entity/entity';
import { EVICT_CACHE_ID, STATISTICS_ID } from 'renderer/entity/actions';
import { EnrichedInstanceCacheRO } from 'renderer/apis/requests/instance/caches/getInstanceCaches';
import { FormattedMessage } from 'react-intl';
import { Link } from '@mui/material';
import { ABILITIES_DOCUMENTATION_URL } from '../../constants/ui';

// 实例缓存实体，映射 Spring 缓存
export const instanceCacheEntity: Entity<EnrichedInstanceCacheRO> = {
  // id
  id: 'instanceCache',
  // 展示列
  columns: [
    // 名称
    {
      id: 'name',
      type: 'Text',
      labelId: 'name',
      getTooltip: (item) => item.target,
    },
    // 缓存控制器名称
    {
      id: 'cacheManager',
      type: 'Text',
      labelId: 'cacheManager',
    },
  ],
  // 操作
  actions: [
    // 展示统计操作
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
  // 清理缓存操作
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
  // 排序
  defaultOrder: [
    // 名称正序
    {
      id: 'name',
      direction: 'asc',
    },
  ],
  // 分页
  paging: true,
  getId: (item) => item.name,
  // 数据过滤
  filterData: (data, filter) =>
    data.filter(
      (item) =>
        item.name?.toLowerCase().includes(filter.toLowerCase()) ||
        item.cacheManager?.toLowerCase().includes(filter.toLowerCase())
    ),
};
