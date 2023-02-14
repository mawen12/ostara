import { BaseMutationOptions, BaseUseMutationResult, useBaseMutation } from 'renderer/apis/base/useBaseMutation';
import { axiosInstance } from '../axiosInstance';
import { AxiosResponse } from 'axios';

type Variables = {
  instanceId: string;
};

type Data = void;

export const evictAllInstanceCaches = async (variables: Variables): Promise<Data> => {
  return (await axiosInstance.delete<Data, AxiosResponse<Data>>(`cache/instance/${variables.instanceId}`)).data;
};

export const useEvictAllInstanceCaches = (
  options?: BaseMutationOptions<Data, Variables>
): BaseUseMutationResult<Data, Variables> =>
  useBaseMutation<Data, Variables>(evictAllInstanceCaches, {
    ...options,
  });
