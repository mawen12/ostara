import { useMemo } from 'react';
import { MUIconType } from 'renderer/components/common/IconViewer';
import { getItemType, getItemTypeIcon } from 'renderer/utils/itemUtils';
import { ItemRO } from '../definitions/daemon';

export const DEFAULT_ICON_VALUE = 'default';

// 获取元素的图标
const useItemIcon = (item: ItemRO): MUIconType => {
  const typeIcon = useMemo<MUIconType>(() => getItemTypeIcon(getItemType(item)), [item]);
  return useMemo<MUIconType>(() => {
    if (item.icon === DEFAULT_ICON_VALUE) {
      return typeIcon;
    }
    return (item.icon as MUIconType) || typeIcon;
  }, [item.icon, typeIcon]);
};
export default useItemIcon;
