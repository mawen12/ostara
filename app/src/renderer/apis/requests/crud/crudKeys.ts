import { CrudEntity } from './entity/entity';

// 定义对象 Curd 键
export const crudKeys = {
  // 传递实体，返回数组的方法
  entity: (entity: CrudEntity) => ['crud', entity.id], 
  // 传递实体与任意参数，返回数组的方法
  entityItems: (entity: CrudEntity, vars: any) => [...crudKeys.entity(entity), 'items', vars],
  // 传递实体与任意参数，返回数组的方法
  entityItemsCount: (entity: CrudEntity, vars: any) => [...crudKeys.entityItems(entity, vars), 'count'],
  // 传递实体与id，返回数组的方法
  entityItem: (entity: CrudEntity, id: string) => [...crudKeys.entity(entity), 'item', id],
};
