import React, { FunctionComponent, useCallback, useMemo } from 'react';
import Page from 'renderer/components/layout/Page';
import TableComponent from 'renderer/components/table/TableComponent';
import { Entity } from 'renderer/entity/entity';
import {
  EnrichedFlywayMigration,
  useGetInstanceFlywayMigrationsQuery,
} from 'renderer/apis/requests/instance/flyway/getInstanceFlywayMigrations';
import { instanceFlywayMigrationEntity } from 'renderer/entity/entities/instanceFlywayMigration.entity';

type FlywayMigrationsTableProps = {
  instanceId: string;
  context: string;
};

const FlywayMigrationsTable: FunctionComponent<FlywayMigrationsTableProps> = ({ instanceId, context }) => {
  const entity = useMemo<Entity<EnrichedFlywayMigration>>(() => instanceFlywayMigrationEntity, []);
  const queryState = useGetInstanceFlywayMigrationsQuery({ instanceId, context });

  const actionsHandler = useCallback(async (actionId: string, row: EnrichedFlywayMigration): Promise<void> => {}, []);

  const massActionsHandler = useCallback(
    async (actionId: string, selectedRows: EnrichedFlywayMigration[]): Promise<void> => {},
    []
  );

  const globalActionsHandler = useCallback(async (actionId: string): Promise<void> => {}, []);

  return (
    <TableComponent
      entity={entity}
      queryState={queryState}
      actionsHandler={actionsHandler}
      massActionsHandler={massActionsHandler}
      globalActionsHandler={globalActionsHandler}
    />
  );
};

export default FlywayMigrationsTable;
