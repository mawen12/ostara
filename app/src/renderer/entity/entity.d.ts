import { MUIconType } from 'renderer/components/common/IconViewer';
import { ComponentType, ReactNode } from 'react';
import { LabelColor } from 'renderer/components/common/Label';
import { IntlShape } from 'react-intl';

// 通用实体定义
export type Entity<EntityItem, CustomFilters = never> = {
  // id
  id: string;
  // 展示列
  columns: EntityColumn<EntityItem>[];
  // 操作
  actions: EntityAction<EntityItem>[];
  massActions: EntityActionMass[];
  // 全局操作
  globalActions: EntityActionGlobal[];
  // 行操作
  rowAction?: EntityRowAction<EntityItem>;
  // 排序
  defaultOrder: {
    id: string;
    direction: 'asc' | 'desc';
  }[];
  // 是否分页
  paging: boolean;
  // 获取ID
  getId: (item: EntityItem) => string;
  getAnchor?: (item: EntityItem) => string;
  // 数据过滤
  filterData: (data: EntityItem[], filter: string, customFilters?: CustomFilters) => EntityItem[];
  CustomFiltersComponent?: ComponentType<{ onChange?: (customFilters?: CustomFilters) => void }>;
};

// 实体基础列
export type EntityBaseColumn<EntityItem> = {
  // id
  id: string;
  // 位置
  align?: 'left' | 'right' | 'center';
  // 标识id
  labelId: string;
  // 宽度
  width?: number | string;
  // 提示
  getTooltip?: (item: EntityItem) => string | undefined;
};

// 文本类型的列
export type EntityTextColumn<EntityItem> = EntityBaseColumn<EntityItem> & {
  readonly type: 'Text';
};

// 数字类型的列
export type EntityNumberColumn<EntityItem> = EntityBaseColumn<EntityItem> & {
  readonly type: 'Number';
  round?: number;
};

// 调度表达式类型的列
export type EntityCronColumn<EntityItem> = EntityBaseColumn<EntityItem> & {
  readonly type: 'Cron';
};

// 日志类型的列
export type EntityDateColumn<EntityItem> = EntityBaseColumn<EntityItem> & {
  readonly type: 'Date';
};

// 解析日期类型的列
export type EntityParsedDateColumn<EntityItem> = EntityBaseColumn<EntityItem> & {
  readonly type: 'ParsedDate';
};

// 字节类型的列
export type EntityBytesColumn<EntityItem> = EntityBaseColumn<EntityItem> & {
  readonly type: 'Bytes';
};

// Label 类型的列，支持定义颜色，文本
export type EntityLabelColumn<EntityItem> = EntityBaseColumn<EntityItem> & {
  readonly type: 'Label';
  getColor: (item: EntityItem) => LabelColor;
  getText?: (item: EntityItem, intl: IntlShape) => ReactNode;
};

// 计数类型的列
export type EntityCountdownColumn<EntityItem> = EntityBaseColumn<EntityItem> & {
  readonly type: 'Countdown';
  isSeconds?: boolean;
};

// 定时类型的列
export type EntityIntervalColumn<EntityItem> = EntityBaseColumn<EntityItem> & {
  readonly type: 'Interval';
  isSeconds?: boolean;
};

// 自定义文本类型的列
export type EntityCustomTextColumn<EntityItem> = EntityBaseColumn<EntityItem> & {
  readonly type: 'CustomText';
  getText: (item: EntityItem, intl: IntlShape) => ReactNode;
};

// 自定义类型的列
export type EntityCustomColumn<EntityItem> = EntityBaseColumn<EntityItem> & {
  readonly type: 'Custom';
  Component: ComponentType<{ column: EntityBaseColumn<EntityItem>; row: EntityItem }>;
};

export type EntityColumn<EntityItem> =
  | EntityTextColumn<EntityItem>
  | EntityNumberColumn<EntityItem>
  | EntityCronColumn<EntityItem>
  | EntityDateColumn<EntityItem>
  | EntityParsedDateColumn<EntityItem>
  | EntityBytesColumn<EntityItem>
  | EntityLabelColumn<EntityItem>
  | EntityCountdownColumn<EntityItem>
  | EntityIntervalColumn<EntityItem>
  | EntityCustomTextColumn<EntityItem>
  | EntityCustomColumn<EntityItem>;

// 行操作-跳转
export type EntityRowActionNavigate<EntityItem> = {
  readonly type: 'Navigate';
  getUrl: (item: EntityItem) => string;
};

// 行操作-展示详情
export type EntityRowActionDetails<EntityItem> = {
  readonly type: 'Details';
  Component: ComponentType<{ row: EntityItem }>;
};

export type EntityRowAction<EntityItem> = EntityRowActionNavigate<EntityItem> | EntityRowActionDetails<EntityItem>;

export type EntityActionBase = {
  id: string;
  labelId: string;
  icon: MUIconType;
};

export type EntityAction<EntityItem> = EntityActionBase & {
  isDisabled?: (item: EntityItem) => boolean | ReactNode;
};

export type EntityActionMass = EntityActionBase;

export type EntityActionGlobal = EntityActionBase;
