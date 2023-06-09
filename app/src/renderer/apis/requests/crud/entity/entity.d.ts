// 定义 CRUD 实体类型
export type CrudEntityType = 'CrudFramework' | 'LocalStorage';

// 定义 CRUD 基类
export type CrudEntityBase = {
  id: string;
};

// 定义基于Crud框架的实体
type CrudEntityCrudFramework = CrudEntityBase & {
  type: 'CrudFramework';
  path: string;
};

// 定义基于本地存储的实体
type CrudEntityLocalStorage = CrudEntityBase & {
  type: 'LocalStorage';
};

// 定义Crud实体
export type CrudEntity = CrudEntityCrudFramework | CrudEntityLocalStorage;

// 定义基类返回结构
export type BaseRO = {
  id: string;
};
