import { Entity } from 'renderer/entity/entity';
import { EnrichedFlywayMigration } from 'renderer/apis/requests/instance/flyway/getInstanceFlywayMigrations';
import FlywayMigrationDetails from 'renderer/pages/navigator/instance/flyway/components/FlywayMigrationDetails';
import TableCellDataFlywayMigrationVersion from '../../components/table/data/custom/TableCellDataFlywayMigrationVersion';

// 实例Flyway集成，映射 Spring 中第三发应用 Flyway
export const instanceFlywayMigrationEntity: Entity<EnrichedFlywayMigration> = {
  id: 'instanceFlywayMigration',
  // 展示列
  columns: [
    // 顺序
    {
      id: 'installedRank',
      type: 'Number',
      labelId: 'installedRank',
    },
    // 版本
    {
      id: 'version',
      type: 'Custom',
      labelId: 'version',
      Component: TableCellDataFlywayMigrationVersion,
    },
    // 描述
    {
      id: 'description',
      type: 'Text',
      labelId: 'description',
    },
    // 安装时间
    {
      id: 'installedOn',
      type: 'ParsedDate',
      labelId: 'installedOn',
    },
    // 状态
    {
      id: 'state',
      type: 'Label',
      labelId: 'state',
      getColor: (item) => {
        switch (item.state) {
          case 'SUCCESS':
          case 'FUTURE_SUCCESS':
            return 'success';
          case 'OUT_OF_ORDER':
            return 'warning';
          default:
            return 'default';
        }
      },
    },
  ],
  actions: [],
  massActions: [],
  globalActions: [],
  // 行操作，展示详情
  rowAction: {
    type: 'Details',
    Component: FlywayMigrationDetails,
  },
  defaultOrder: [
    {
      id: 'installedRank',
      direction: 'desc',
    },
  ],
  // 分页
  paging: true,
  getId: (item) => `${item.script}_${item.installedOn}`,
  filterData: (data, filter) =>
    data.filter(
      (item) =>
        item.description?.toLowerCase().includes(filter.toLowerCase()) ||
        item.installedBy?.toLowerCase().includes(filter.toLowerCase()) ||
        item.installedRank?.toString().toLowerCase().includes(filter.toLowerCase())
    ),
};
