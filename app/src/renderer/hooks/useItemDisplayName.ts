import { useMemo } from 'react';
import { ItemRO } from '../definitions/daemon';
import { getItemDisplayName } from '../utils/itemUtils';

// 展示元素名称
const useItemDisplayName = (item: ItemRO): string => {
  return useMemo<string>(() => getItemDisplayName(item), [item]);
};
export default useItemDisplayName;
