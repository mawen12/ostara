import React, { FunctionComponent, useCallback, useMemo } from 'react';
import Page from 'renderer/components/layout/Page';
import { useNavigatorTree } from 'renderer/contexts/NavigatorTreeContext';
import { EnrichedInstance } from 'infra/configuration/model/configuration';
import { Entity } from 'renderer/entity/entity';
import TableComponent from 'renderer/components/table/TableComponent';
import { EnvProperty, useGetInstanceEnvPropertiesQuery } from 'renderer/apis/instance/getInstanceEnvProperties';
import { instanceEnvEntity } from 'renderer/entity/entities/instanceEnv.entity';
import useCopyToClipboard from 'renderer/hooks/useCopyToClipboard';
import { COPY_ID } from 'renderer/entity/actions';
import { Card } from '@mui/material';

const InstanceEnvironment: FunctionComponent = () => {
  const { selectedItem } = useNavigatorTree();
  const copyToClipboard = useCopyToClipboard();

  const item = useMemo<EnrichedInstance>(() => selectedItem as EnrichedInstance, [selectedItem]);

  const entity = useMemo<Entity<EnvProperty>>(() => instanceEnvEntity, []);
  const queryState = useGetInstanceEnvPropertiesQuery({ instanceId: item.id });

  const getPropertyString = useCallback((property: EnvProperty): string => {
    return property.value;
  }, []);

  const actionsHandler = useCallback(async (actionId: string, row: EnvProperty): Promise<void> => {
    switch (actionId) {
      case COPY_ID:
        copyToClipboard(getPropertyString(row));
        break;
      default:
        break;
    }
  }, []);

  const massActionsHandler = useCallback(async (actionId: string, selectedRows: EnvProperty[]): Promise<void> => {
    switch (actionId) {
      case COPY_ID:
        copyToClipboard(selectedRows.map(getPropertyString).join(', '));
        break;
      default:
        break;
    }
  }, []);

  const globalActionsHandler = useCallback(async (actionId: string): Promise<void> => {}, []);

  return (
    <Page>
      <Card>
        <TableComponent
          entity={entity}
          queryState={queryState}
          actionsHandler={actionsHandler}
          massActionsHandler={massActionsHandler}
          globalActionsHandler={globalActionsHandler}
        />
      </Card>
    </Page>
  );
};

export default InstanceEnvironment;
