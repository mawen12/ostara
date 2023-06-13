import { MutationFunction } from '@tanstack/react-query';
import { BaseMutationOptions, BaseUseMutationResult, useBaseMutation } from '../../base/useBaseMutation';
import { CrudEntity } from '../entity/entity';
import { crudKeys } from '../crudKeys';

// 定义对象 Crud 变量
export type CrudVariables = { entity: CrudEntity };

// 定义对象，使用 BaseMutationOptions 的属性，并忽略 invalidateQueriesKeyFn 属性
export type CrudMutationOptions<Data, Variables extends CrudVariables> = Omit<
  BaseMutationOptions<Data, Variables>,
  'invalidateQueriesKeyFn'
>;

// 定义用于Curd的变化对象结果
export type CrudUseMutationResult<Data, Variables extends CrudVariables> = BaseUseMutationResult<Data, Variables>;

export const useCrudMutation = <Data, Variables extends CrudVariables>(
  mutationFn: MutationFunction<Data, Variables>,
  options?: CrudMutationOptions<Data, Variables>
): CrudUseMutationResult<Data, Variables> =>
  useBaseMutation<Data, Variables>(mutationFn, {
    ...options,
    invalidateQueriesKeyFn: (data, variables) => crudKeys.entity(variables.entity),
  });

export const useCrudReadMutation = <Data, Variables extends CrudVariables>(
  mutationFn: MutationFunction<Data, Variables>,
  options?: CrudMutationOptions<Data, Variables>
): CrudUseMutationResult<Data, Variables> => useBaseMutation<Data, Variables>(mutationFn, options);
