import {
  BaseMutationOptions,
  BaseUseMutationResult,
  useBaseMutation,
} from 'renderer/apis/requests/base/useBaseMutation';
import { BaseQueryOptions, BaseUseQueryResult, useBaseQuery } from 'renderer/apis/requests/base/useBaseQuery';
import { apiKeys } from 'renderer/apis/apiKeys';
import { TestConnectionResponse } from '../../../../common/generated_definitions';
import { axiosInstance } from '../../axiosInstance';
import { AxiosResponse } from 'axios';

type Variables = { actuatorUrl: string };

type Data = TestConnectionResponse;

export const testConnectionByUrl = async (variables: Variables): Promise<Data> => {
  return (
    await axiosInstance.post<Data, AxiosResponse<Data>, null>(
      `actuator/testConnection?url=${encodeURIComponent(variables.actuatorUrl)}`
    )
  ).data;
};

export const useTestConnectionByUrl = (
  options?: BaseMutationOptions<Data, Variables>
): BaseUseMutationResult<Data, Variables> => useBaseMutation<Data, Variables>(testConnectionByUrl, options);

export const useTestConnectionByUrlQuery = (
  variables: Variables,
  options?: BaseQueryOptions<Data, Variables>
): BaseUseQueryResult<Data> =>
  useBaseQuery<Data, Variables>(
    apiKeys.actuatorConnection(variables.actuatorUrl),
    testConnectionByUrl,
    variables,
    options
  );
