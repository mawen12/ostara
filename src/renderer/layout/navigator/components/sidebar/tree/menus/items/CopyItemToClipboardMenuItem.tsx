import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useUi } from 'renderer/contexts/UiContext';
import CustomMenuItem from 'renderer/components/menu/item/CustomMenuItem';
import useCopyToClipboard from 'renderer/hooks/useCopyToClipboard';
import { ItemRO } from '../../../../../../../definitions/daemon';

type CopyItemToClipboardMenuItemProps = {
  item: ItemRO;
  onClose?: () => void;
};

export default function CopyItemToClipboardMenuItem({ item, onClose }: CopyItemToClipboardMenuItemProps) {
  const { developerMode } = useUi();
  const copyToClipboard = useCopyToClipboard();

  const copyHandler = useCallback((): void => {
    onClose?.();
    copyToClipboard(JSON.stringify(item));
  }, [onClose, copyToClipboard, item]);

  if (!developerMode) {
    return null;
  }

  return <CustomMenuItem icon={'FileCopyOutlined'} text={<FormattedMessage id={'copyJson'} />} onClick={copyHandler} />;
}
