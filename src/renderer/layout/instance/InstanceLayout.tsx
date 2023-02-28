import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import { useNavigatorTree } from 'renderer/contexts/NavigatorTreeContext';
import InstanceSidebar from 'renderer/layout/instance/components/InstanceSidebar';
import SecondarySidebarLayout from 'renderer/layout/common/secondary-sidebar/SecondarySidebarLayout';
import InstanceUnreachable from 'renderer/layout/instance/components/health/InstanceUnreachable';
import InstanceInvalid from 'renderer/layout/instance/components/health/InstanceInvalid';
import InstancePending from 'renderer/layout/instance/components/health/InstancePending';
import { InstanceRO } from '../../../common/generated_definitions';

const InstanceLayout: FunctionComponent = () => {
  const { selectedItem } = useNavigatorTree();

  const item = useMemo<InstanceRO>(() => selectedItem as InstanceRO, [selectedItem]);

  const content = useMemo<ReactNode | undefined>(() => {
    switch (item.health.status) {
      case 'PENDING':
        return <InstancePending item={item} />;
      case 'UNREACHABLE':
        return <InstanceUnreachable item={item} />;
      case 'INVALID':
        return <InstanceInvalid item={item} />;
      default:
        return undefined;
    }
  }, [item]);

  const sidebarDisabled = useMemo<boolean>(() => !!content, [content]);

  if (!item) {
    return null;
  }

  return (
    <SecondarySidebarLayout
      Sidebar={InstanceSidebar}
      sidebarProps={{ item, disabled: sidebarDisabled }}
      content={content}
    />
  );
};

export default InstanceLayout;
