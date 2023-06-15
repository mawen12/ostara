import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import copy from 'copy-to-clipboard';
import { FormattedMessage } from 'react-intl';

// 将文本添加到剪切板
const useCopyToClipboard = (): ((stringToCopy: string) => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(async (stringToCopy: string): Promise<void> => {
    const result = copy(stringToCopy);
    enqueueSnackbar(<FormattedMessage id={result ? 'copyToClipboardSuccess' : 'copyIdToClipboardFailed'} />, {
      variant: result ? 'success' : 'error',
    });
  }, []);
};
export default useCopyToClipboard;
