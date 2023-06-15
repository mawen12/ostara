import { generatePath } from 'react-router-dom';
import { urls } from 'renderer/routes/urls';
import { green, orange, pink, red, yellow } from '@mui/material/colors';
import blueGrey from '@mui/material/colors/blueGrey';
import { MUIconType } from 'renderer/components/common/IconViewer';
import { ItemRO, ItemType } from '../definitions/daemon';
import { ApplicationRO, FolderRO, InstanceHealthRO, InstanceRO } from '../../common/generated_definitions';
import { CrudEntity } from '../apis/requests/crud/entity/entity';
import { applicationCrudEntity } from '../apis/requests/crud/entity/entities/application.crudEntity';
import { instanceCrudEntity } from '../apis/requests/crud/entity/entities/instance.crudEntity';
import { folderCrudEntity } from '../apis/requests/crud/entity/entities/folder.crudEntity';
import React, { ReactNode } from 'react';
import { CircularProgress } from '@mui/material';

export function isApplication(item: ItemRO): item is ApplicationRO {
  return 'type' in item;
}

export function isFolder(item: ItemRO): item is FolderRO {
  return !isApplication(item) && !isInstance(item);
}

export function isInstance(item: ItemRO): item is InstanceRO {
  return 'actuatorUrl' in item;
}

export const getItemType = (item: ItemRO): ItemType => {
  if (isApplication(item)) {
    return 'application';
  }
  if (isFolder(item)) {
    return 'folder';
  }
  if (isInstance(item)) {
    return 'instance';
  }
  throw new Error(`Unknown item type`);
};

// 获取展示名称的逻辑
// 应用和文件展示别名，实例，别名 > 主机名 > 监听路径
export const getItemDisplayName = (item: ItemRO): string => {
  if (isApplication(item)) {
    return item.alias;
  }
  if (isFolder(item)) {
    return item.alias;
  }
  if (isInstance(item)) {
    return (
      item.alias ||
      item.hostname ||
      item.actuatorUrl
        .replace(/^https?:\/\//i, '') // Remove protocol
        .replace(/\/.*$/, '') // Remove path
    );
  }
  throw new Error(`Unknown item type`);
};

export const getItemParentId = (item: ItemRO): string | undefined => {
  if (isApplication(item)) {
    return item.parentFolderId;
  }
  if (isFolder(item)) {
    return item.parentFolderId;
  }
  if (isInstance(item)) {
    return item.parentApplicationId;
  }
  throw new Error(`Unknown item type`);
};

export const getItemEntity = (item: ItemRO): CrudEntity => {
  return getItemTypeEntity(getItemType(item));
};

export const getItemTypeEntity = (itemType: ItemType): CrudEntity => {
  switch (itemType) {
    case 'folder':
      return folderCrudEntity;
    case 'application':
      return applicationCrudEntity;
    case 'instance':
      return instanceCrudEntity;
    default:
      throw new Error(`Unknown item type`);
  }
};

export const getItemTypeIcon = (itemType: ItemType): MUIconType => {
  switch (itemType) {
    case 'folder':
      return 'FolderOutlined';
    case 'application':
      return 'CloudOutlined';
    case 'instance':
      return 'DnsOutlined';
    default:
      throw new Error(`Unknown item type`);
  }
};

export const getItemTypeTextId = (itemType: ItemType): string => {
  switch (itemType) {
    case 'folder':
      return 'folder';
    case 'application':
      return 'application';
    case 'instance':
      return 'instance';
    default:
      throw new Error(`Unknown item type`);
  }
};

export const getItemUrl = (item: ItemRO): string => {
  const itemType = getItemType(item);
  switch (itemType) {
    case 'folder':
      return generatePath(urls.folder.url, { id: item.id });
    case 'application':
      return generatePath(urls.application.url, { id: item.id });
    case 'instance':
      return generatePath(urls.instance.url, { id: item.id });
    default:
      throw new Error(`Unknown item type`);
  }
};

export const getItemNameTooltip = (item: ItemRO): ReactNode | undefined => {
  if (isInstance(item)) {
    return item.actuatorUrl;
  }
  return undefined;
};

export const isItemDemo = (item: ItemRO): boolean => {
  if (isApplication(item)) {
    return item.demo;
  }
  if (isInstance(item)) {
    return item.demo;
  }
  return false;
};

export const isItemUpdatable = (item: ItemRO): boolean => {
  if (isItemDemo(item)) {
    return false;
  }
  return true;
};

export const isItemDeletable = (item: ItemRO): boolean => {
  if (isItemDemo(item)) {
    return false;
  }
  return true;
};

export const isInstanceInactive = (instance: InstanceRO): boolean => {
  return instance.health.status === 'UNREACHABLE' || instance.health.status === 'INVALID';
};

const HEALTH_STATUS_COLORS_INDEX = 600;

export const getInstanceHealthStatusColor = (instanceHealth: InstanceHealthRO): string | undefined => {
  switch (instanceHealth.status) {
    case 'UP':
      return green[HEALTH_STATUS_COLORS_INDEX];
    case 'DOWN':
      return red[HEALTH_STATUS_COLORS_INDEX];
    case 'OUT_OF_SERVICE':
      return yellow[HEALTH_STATUS_COLORS_INDEX];
    case 'UNREACHABLE':
      return pink[HEALTH_STATUS_COLORS_INDEX];
    case 'UNKNOWN':
      return blueGrey[HEALTH_STATUS_COLORS_INDEX];
    case 'PENDING':
      return 'text.primary';
    default:
      return undefined;
  }
};

export const getApplicationHealthStatusColor = (application: ApplicationRO): string | undefined => {
  switch (application.health.status) {
    case 'ALL_UP':
      return green[HEALTH_STATUS_COLORS_INDEX];
    case 'ALL_DOWN':
      return red[HEALTH_STATUS_COLORS_INDEX];
    case 'SOME_DOWN':
      return orange[HEALTH_STATUS_COLORS_INDEX];
    case 'UNKNOWN':
      return blueGrey[HEALTH_STATUS_COLORS_INDEX];
    case 'PENDING':
      return 'text.primary';
    case 'EMPTY':
      return undefined;
    default:
      return undefined;
  }
};

export const getItemHealthStatusColor = (item: ItemRO): string | undefined => {
  if (isInstance(item)) {
    return getInstanceHealthStatusColor(item.health);
  }
  if (isApplication(item)) {
    return getApplicationHealthStatusColor(item);
  }
  return undefined;
};

export const getItemHealthStatusComponent = (item: ItemRO): ReactNode | undefined => {
  if (
    (isInstance(item) && item.health.status === 'PENDING') ||
    (isApplication(item) && item.health.status === 'PENDING')
  ) {
    return <CircularProgress size={6} thickness={12} />;
  }
  return undefined;
};

export const getItemHealthStatusTextId = (item: ItemRO): string | undefined => {
  if (isInstance(item)) {
    switch (item.health.status) {
      case 'UP':
        return 'up';
      case 'DOWN':
        return 'down';
      case 'OUT_OF_SERVICE':
        return 'outOfService';
      case 'UNREACHABLE':
        return 'unreachable';
      case 'UNKNOWN':
        return 'unknown';
      case 'PENDING':
        return 'loading';
      default:
        return undefined;
    }
  }
  if (isApplication(item)) {
    switch (item.health.status) {
      case 'ALL_UP':
        return 'up';
      case 'ALL_DOWN':
        return 'down';
      case 'SOME_DOWN':
        return 'mixed';
      case 'UNKNOWN':
        return 'unknown';
      case 'PENDING':
        return 'loading';
      case 'EMPTY':
        return undefined;
      default:
        return undefined;
    }
  }
  return undefined;
};

// export const getDataCollectionModeColor = (dataCollectionMode: DataCollectionMode): ColorSchema => {
//   switch (dataCollectionMode) {
//     case 'on':
//       return 'success';
//     case 'off':
//       return 'error';
//     default:
//       return 'primary';
//   }
// };
//
// export const getDataCollectionModeTextId = (dataCollectionMode: DataCollectionMode): string => {
//   switch (dataCollectionMode) {
//     case 'on':
//       return 'on';
//     case 'off':
//       return 'off';
//     default:
//       return 'notAvailable';
//   }
// };

export const getActuatorUrls = (value: string): string[] => {
  return value
    .split(/[,\n ]/)
    .map((url) => url.trim())
    .filter((url) => url.length > 0);
};
