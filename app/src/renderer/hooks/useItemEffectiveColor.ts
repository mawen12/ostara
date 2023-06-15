import { useCallback, useMemo } from 'react';
import { ItemRO } from '../definitions/daemon';
import { useNavigatorTree } from '../contexts/NavigatorTreeContext';
import { DEFAULT_COLOR_VALUE, INHERITED_COLOR_VALUE } from './useItemColor';
import { isInstance } from '../utils/itemUtils';
import { useItems } from '../contexts/ItemsContext';

// 获取元素有效颜色，如果标识为层级，且为实例，则获取父级的颜色，反之获取默认颜色
const useItemEffectiveColor = (item: ItemRO): string => {
  const { getItem } = useItems();
  const { data } = useNavigatorTree();

  const getItemEffectiveColor = useCallback(
    (itemToCheck: ItemRO): string => {
      if (itemToCheck.color !== INHERITED_COLOR_VALUE) {
        return itemToCheck.color;
      }
      if (isInstance(itemToCheck)) {
        const parent = getItem(itemToCheck.parentApplicationId);
        if (parent) {
          return getItemEffectiveColor(parent);
        }
      } else {
        const parent = !!itemToCheck.parentFolderId && getItem(itemToCheck.parentFolderId);
        if (parent) {
          return getItemEffectiveColor(parent);
        }
      }
      return DEFAULT_COLOR_VALUE;
    },
    [getItem]
  );

  return useMemo<string>(() => getItemEffectiveColor(item), [item, data]);
};
export default useItemEffectiveColor;
