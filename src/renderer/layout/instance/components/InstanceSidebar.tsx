import Sidebar from 'renderer/components/menu/sidebar/Sidebar';
import { SidebarConfig } from 'renderer/components/menu/sidebar/SidebarSection';
import {
  AccessTimeOutlined,
  BarChartOutlined,
  ClassOutlined,
  DataUsageOutlined,
  DeviceHubOutlined,
  EggOutlined,
  EventRepeatOutlined,
  HttpOutlined,
  LanOutlined,
  ListAltOutlined,
  ParkOutlined,
  StorageOutlined,
  TextSnippetOutlined,
} from '@mui/icons-material';
import { urls } from 'renderer/routes/urls';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { generatePath } from 'react-router-dom';
import ItemHeader from 'renderer/components/item/ItemHeader';
import { Box } from '@mui/material';
import { isServiceInactive } from 'renderer/utils/itemUtils';
import { InstanceRO } from '../../../../common/generated_definitions';

type InstanceSidebarProps = { item: InstanceRO; disabled: boolean; width: number };

export default function InstanceSidebar({ item, disabled, width }: InstanceSidebarProps) {
  const navConfig = useMemo<SidebarConfig>(
    () => [
      {
        id: 'insights',
        label: <FormattedMessage id={'insights'} />,
        items: [
          {
            id: 'dashboard',
            icon: <BarChartOutlined />,
            label: <FormattedMessage id={'dashboard'} />,
            to: generatePath(urls.instanceDashboard.url, { id: item.id }),
            disabled: disabled,
          },
          {
            id: 'metrics',
            icon: <DataUsageOutlined />,
            label: <FormattedMessage id={'metrics'} />,
            to: generatePath(urls.instanceMetrics.url, { id: item.id }),
            disabled: disabled || isServiceInactive(item, 'METRICS'),
          },
          {
            id: 'environment',
            icon: <ParkOutlined />,
            label: <FormattedMessage id={'environment'} />,
            to: generatePath(urls.instanceEnvironment.url, { id: item.id }),
            disabled: disabled || isServiceInactive(item, 'ENV'),
          },
          {
            id: 'beans',
            icon: <EggOutlined />,
            label: <FormattedMessage id={'beans'} />,
            to: generatePath(urls.instanceBeans.url, { id: item.id }),
            disabled: disabled || isServiceInactive(item, 'BEANS'),
          },
          {
            id: 'properties',
            icon: <ListAltOutlined />,
            label: <FormattedMessage id={'properties'} />,
            to: generatePath(urls.instanceProperties.url, { id: item.id }),
            disabled: disabled || isServiceInactive(item, 'PROPERTIES'),
          },
          {
            id: 'http-requests',
            icon: <HttpOutlined />,
            label: <FormattedMessage id={'httpRequests'} />,
            to: generatePath(urls.instanceHttpRequests.url, { id: item.id }),
            disabled: disabled,
            hidden: isServiceInactive(item, 'HTTP_REQUEST_STATISTICS'),
          },
          {
            id: 'quartz',
            icon: <AccessTimeOutlined />,
            label: <FormattedMessage id={'quartz'} />,
            to: generatePath(urls.instanceQuartz.url, { id: item.id }),
            disabled: disabled,
            hidden: isServiceInactive(item, 'QUARTZ'),
          },
          {
            id: 'scheduled-tasks',
            icon: <EventRepeatOutlined />,
            label: <FormattedMessage id={'scheduledTasks'} />,
            to: generatePath(urls.instanceScheduledTasks.url, { id: item.id }),
            disabled: disabled,
            hidden: isServiceInactive(item, 'SCHEDULEDTASKS'),
          },
          {
            id: 'flyway',
            icon: <StorageOutlined />,
            label: <FormattedMessage id={'flyway'} />,
            to: generatePath(urls.instanceFlyway.url, { id: item.id }),
            disabled: disabled,
            hidden: isServiceInactive(item, 'FLYWAY'),
          },
          {
            id: 'liquibase',
            icon: <StorageOutlined />,
            label: <FormattedMessage id={'liquibase'} />,
            to: generatePath(urls.instanceLiquibase.url, { id: item.id }),
            disabled: disabled,
            hidden: isServiceInactive(item, 'LIQUIBASE'),
          },
        ],
      },
      {
        id: 'manage',
        label: <FormattedMessage id={'manage'} />,
        items: [
          {
            id: 'loggers',
            icon: <TextSnippetOutlined />,
            label: <FormattedMessage id={'loggers'} />,
            to: generatePath(urls.instanceLoggers.url, { id: item.id }),
            disabled: disabled || isServiceInactive(item, 'LOGGERS'),
          },
          {
            id: 'caches',
            icon: <ClassOutlined />,
            label: <FormattedMessage id={'caches'} />,
            to: generatePath(urls.instanceCaches.url, { id: item.id }),
            disabled: disabled || isServiceInactive(item, 'CACHES'),
          },
        ],
      },
      {
        id: 'jvm',
        label: <FormattedMessage id={'jvm'} />,
        items: [
          {
            id: 'threadDump',
            icon: <DeviceHubOutlined />,
            label: <FormattedMessage id={'threadDump'} />,
            to: generatePath(urls.instanceThreadDump.url, { id: item.id }),
            disabled: disabled || isServiceInactive(item, 'THREADDUMP'),
          },
          {
            id: 'heapDump',
            icon: <LanOutlined />,
            label: <FormattedMessage id={'heapDump'} />,
            to: generatePath(urls.instanceHeapDump.url, { id: item.id }),
            disabled: disabled || isServiceInactive(item, 'HEAPDUMP'),
          },
        ],
      },
    ],
    [item, disabled]
  );

  return (
    <Box sx={{ width: width, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Sidebar sidebarConfig={navConfig} header={<ItemHeader item={item} />} sx={{ flexGrow: 1 }} />
      {/*<Divider />*/}
      {/*<InstanceDataCollectionToggle item={item} />*/}
    </Box>
  );
}
