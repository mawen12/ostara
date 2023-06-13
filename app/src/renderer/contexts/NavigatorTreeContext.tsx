import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { TreeItem } from 'renderer/layout/navigator/components/sidebar/tree/tree';
import { useNavigate, useParams } from 'react-router-dom';
import { urls } from 'renderer/routes/urls';
import { ItemRO } from '../definitions/daemon';
import { InstanceAbility } from '../../common/generated_definitions';
import { buildTree } from '../utils/treeUtils';
import { chain } from 'lodash';
import { useGetItemAbilitiesQuery } from '../apis/requests/item/getItemAbilities';
import { useItems } from './ItemsContext';

// 导航树支持的操作：展开全部、收起全部
type NavigatorTreeAction = 'expandAll' | 'collapseAll';

// 导航树上下文属性 
export type NavigatorTreeContextProps = {
  // 树形列表
  data: TreeItem[] | undefined;
  // 已选择列表
  selectedItem: ItemRO | undefined;
  selectedItemAbilities: InstanceAbility[] | undefined;
  // 是否加载中
  isLoading: boolean;
  // 是否为空
  isEmpty: boolean;
  // 是否存在数据
  hasData: boolean;
  // 导航树操作
  action: NavigatorTreeAction | undefined;
  // 触发操作
  performAction: (action: NavigatorTreeAction) => void;
  getNewItemOrder: () => number;
};

// 导航树上下文
const NavigatorTreeContext = React.createContext<NavigatorTreeContextProps>(undefined!);

interface NavigatorTreeProviderProps extends PropsWithChildren<any> {}

const NavigatorTreeProvider: FunctionComponent<NavigatorTreeProviderProps> = ({ children }) => {
  const { folders, applications, instances, items, getItem } = useItems();
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();

  // 树操作
  const [action, setAction] = useState<NavigatorTreeAction | undefined>(undefined);

  // 将文件夹、应用、实例组装为树结构
  const data = useMemo<TreeItem[] | undefined>(
    () => (folders && applications && instances ? buildTree([...folders, ...applications, ...instances]) : undefined),
    [folders, applications, instances]
  );
  // 数据是否正在加载
  const isLoading = useMemo<boolean>(() => !data, [data]);
  // 数据是否为空
  const isEmpty = useMemo<boolean>(() => !!data && data.length === 0, [data]);
  // 数据是否存在
  const hasData = useMemo<boolean>(() => !!data && data.length > 0, [data]);
  
  // 如果参数不存在与列表中，那么展示主页
  useEffect(() => {
    if (items && params.id) {
      const item = items.find((i) => i.id === params.id);
      if (!item) {
        navigate(urls.home.url);
      }
    }
  }, [items]);

  const performAction = useCallback((actionToPerform: NavigatorTreeAction) => {
    setAction(actionToPerform);
  }, []);

  useEffect(() => {
    if (action) {
      setAction(undefined);
    }
  }, [action]);

  // 返回参数获取对应的列表，
  const selectedItem = useMemo<ItemRO | undefined>(() => {
    if (!params.id) {
      return undefined;
    }
    const item = getItem(params.id);
    if (!item) {
      return undefined;
    }
    return item;
  }, [items, params.id]);

  const getItemAbilitiesState = useGetItemAbilitiesQuery(
    { item: selectedItem },
    { enabled: !!selectedItem, refetchInterval: 1000 * 10 }
  );

  const selectedItemAbilities = useMemo<InstanceAbility[] | undefined>(
    () => getItemAbilitiesState.data,
    [getItemAbilitiesState.data]
  );

  const getNewItemOrder = useCallback((): number => {
    return data?.length
      ? chain(data)
          .map<number>((item) => item.sort ?? 0)
          .max()
          .value() + 1
      : 1;
  }, [data]);

  return (
    <NavigatorTreeContext.Provider
      value={{
        data,
        selectedItem,
        selectedItemAbilities,
        isLoading,
        isEmpty,
        hasData,
        action,
        performAction,
        getNewItemOrder,
      }}
    >
      {children}
    </NavigatorTreeContext.Provider>
  );
};

// 对外提供获取导航树上下文的方法
const useNavigatorTree = (): NavigatorTreeContextProps => {
  const context = useContext(NavigatorTreeContext);

  if (!context) throw new Error('NavigatorTreeContext must be used inside NavigatorTreeProvider');

  return context;
};

export { NavigatorTreeContext, NavigatorTreeProvider, useNavigatorTree };
