import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ItemRO } from '../definitions/daemon';
import { useCrudSearchQuery } from '../apis/requests/crud/crudSearch';
import {
  ApplicationHealthUpdatedEventMessage$Payload,
  ApplicationRO,
  FolderRO,
  InstanceHealthChangedEventMessage$Payload,
  InstanceHostnameUpdatedEventMessage$Payload,
  InstanceRO,
} from '../../common/generated_definitions';
import { instanceCrudEntity } from '../apis/requests/crud/entity/entities/instance.crudEntity';
import { folderCrudEntity } from '../apis/requests/crud/entity/entities/folder.crudEntity';
import { applicationCrudEntity } from '../apis/requests/crud/entity/entities/application.crudEntity';
import { useStomp } from '../apis/websockets/StompContext';
import { isApplication, isFolder, isInstance } from '../utils/itemUtils';

// 定义左侧列表项上下文属性
export type ItemsContextProps = {
  folders: FolderRO[] | undefined; // 文件夹数组
  applications: ApplicationRO[] | undefined; // 应用数组
  instances: InstanceRO[] | undefined; // 实例数组
  items: ItemRO[] | undefined;  // 列表项数组
  addItem: (item: ItemRO) => void; // 添加项的方法
  getItem: (id: string) => ItemRO | undefined; // 获取项的方法
};

// 常见需要共享的列表项上下文
const ItemsContext = React.createContext<ItemsContextProps>(undefined!);

interface ItemsProviderProps extends PropsWithChildren<any> {}

// 函数组件
const ItemsProvider: FunctionComponent<ItemsProviderProps> = ({ children }) => {
  // 订阅组件的订阅方法
  const { subscribe } = useStomp();
  // state: 文件夹数组
  const [folders, setFolders] = useState<FolderRO[] | undefined>(undefined);
  // state: 应用数组
  const [applications, setApplications] = useState<ApplicationRO[] | undefined>(undefined);
  // state: 实例数组
  const [instances, setInstances] = useState<InstanceRO[] | undefined>(undefined);
  
  const searchFolderState = useCrudSearchQuery<FolderRO>({ entity: folderCrudEntity });
  const searchApplicationState = useCrudSearchQuery<ApplicationRO>({ entity: applicationCrudEntity });
  const searchInstanceState = useCrudSearchQuery<InstanceRO>({ entity: instanceCrudEntity });

  useEffect(() => {
    setFolders(searchFolderState.data?.results);
  }, [searchFolderState.data]);

  useEffect(() => {
    setApplications(searchApplicationState.data?.results);
  }, [searchApplicationState.data]);

  useEffect(() => {
    setInstances(searchInstanceState.data?.results);
  }, [searchInstanceState.data]);

  const items = useMemo<ItemRO[] | undefined>(
    () => (folders && applications && instances ? [...folders, ...applications, ...instances] : undefined),
    [folders, applications, instances]
  );

  useEffect(() => {
    const unsubscribe = subscribe(
      '/topic/applicationHealth',
      {},
      (healthChanged: ApplicationHealthUpdatedEventMessage$Payload) => {
        setApplications((prev) =>
          prev?.map((a) => (a.id === healthChanged.applicationId ? { ...a, health: healthChanged.newHealth } : a))
        );
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(
      '/topic/instanceHealth',
      {},
      (healthChanged: InstanceHealthChangedEventMessage$Payload): void => {
        setInstances((prev) =>
          prev?.map((i) => (i.id === healthChanged.instanceId ? { ...i, health: healthChanged.newHealth } : i))
        );
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(
      '/topic/instanceHostname',
      {},
      (hostnameUpdated: InstanceHostnameUpdatedEventMessage$Payload): void => {
        setInstances((prev) =>
          prev?.map((i) => (i.id === hostnameUpdated.instanceId ? { ...i, hostname: hostnameUpdated.hostname } : i))
        );
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const addItem = useCallback((item: ItemRO): void => {
    if (isInstance(item)) {
      setInstances((prev) => [...(prev?.filter((i) => i.id !== item.id) ?? []), item]);
    }
    if (isApplication(item)) {
      setApplications((prev) => [...(prev?.filter((a) => a.id !== item.id) ?? []), item]);
    }
    if (isFolder(item)) {
      setFolders((prev) => [...(prev?.filter((f) => f.id !== item.id) ?? []), item]);
    }
  }, []);

  const getItem = useCallback(
    (id: string): ItemRO | undefined => {
      return items?.find((i) => i.id === id);
    },
    [items]
  );

  return (
    <ItemsContext.Provider
      value={{
        folders,
        applications,
        instances,
        items,
        addItem,
        getItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

const useItems = (): ItemsContextProps => {
  const context = useContext(ItemsContext);

  if (!context) throw new Error('ItemsContext must be used inside ItemsProvider');

  return context;
};

export { ItemsContext, ItemsProvider, useItems };
