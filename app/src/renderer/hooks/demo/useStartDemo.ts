import { useCallback, useMemo, useState } from 'react';
import { useCreateDemo } from '../../apis/requests/demo/createDemo';
import { useCrudSearch } from '../../apis/requests/crud/crudSearch';
import { InstanceRO } from '../../../common/generated_definitions';
import { instanceCrudEntity } from '../../apis/requests/crud/entity/entities/instance.crudEntity';
import { getItemUrl } from '../../utils/itemUtils';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { isEmpty } from 'lodash';
import { useItems } from '../../contexts/ItemsContext';

type StartDemoResult = {
  startDemo: () => Promise<void>;
  loading: boolean;
};

// 启动 Demo
const useStartDemo = (): StartDemoResult => {
  const { addItem } = useItems();
  const navigate = useNavigate();
  const { track } = useAnalytics();

  const [loading, setLoading] = useState<boolean>(false);

  const searchInstanceState = useCrudSearch<InstanceRO>({ cacheTime: 0 });

  // 获取 Demo 实例
  const getDemoInstance = useCallback(async (): Promise<InstanceRO | undefined> => {
    try {
      const demoInstancesResult = await searchInstanceState.mutateAsync({
        entity: instanceCrudEntity,
        filterFields: [{ fieldName: 'demo', operation: 'Equal', values: [true] }],
      });
      if (!isEmpty(demoInstancesResult.results)) {
        return demoInstancesResult.results[0];
      }
    } catch (e) {}
    return undefined;
  }, [searchInstanceState]);

  const createDemoState = useCreateDemo();

  // 启动 Demo
  const startDemo = useCallback(async (): Promise<void> => {
    track({ name: 'demo_start' });

    setLoading(true);

    let demoInstance = await getDemoInstance();

    if (!demoInstance) {
      try {
        const demoAddress = window.demo.getDemoAddress();
        await window.demo.startDemo();
        await createDemoState.mutateAsync({ actuatorUrl: demoAddress });
      } catch (error) {}

      demoInstance = await getDemoInstance();
    }

    if (demoInstance) {
      addItem(demoInstance);
      navigate(getItemUrl(demoInstance));
    }

    setLoading(false);
  }, [setLoading, getDemoInstance, createDemoState, addItem, navigate]);

  return useMemo<StartDemoResult>(() => ({ startDemo, loading }), [startDemo, loading]);
};
export default useStartDemo;
