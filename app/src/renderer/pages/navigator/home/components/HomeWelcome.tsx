import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { InstanceRO } from '../../../../../common/generated_definitions';
import NiceModal from '@ebay/nice-modal-react';
import CreateInstanceDialog from '../../../../components/item/dialogs/create/CreateInstanceDialog';
import { useNavigatorTree } from '../../../../contexts/NavigatorTreeContext';
import { LoadingButton } from '@mui/lab';
import useStartDemo from '../../../../hooks/demo/useStartDemo';

type HomeWelcomeProps = {};

export default function HomeWelcome({}: HomeWelcomeProps) {
  const { getNewItemOrder } = useNavigatorTree();
  const { startDemo, loading: loadingDemo } = useStartDemo();

  const createInstanceHandler = useCallback((): void => {
    NiceModal.show<InstanceRO[] | undefined>(CreateInstanceDialog, {
      sort: getNewItemOrder(),
    });
  }, [getNewItemOrder]);

  return (
    <Card>
      <CardContent>
        <Typography variant={'h6'} gutterBottom>
          <FormattedMessage id={'welcomeToApp'} /> &#x1F495;
        </Typography>

        <Typography variant={'body2'} sx={{ color: 'text.secondary' }}>
          <FormattedMessage id={'getStartedAddFirstInstance'} />
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
          <Button variant="outlined" color="primary" onClick={createInstanceHandler}>
            <FormattedMessage id={'createInstance'} />
          </Button>
          <LoadingButton variant="outlined" color="info" onClick={startDemo} loading={loadingDemo}>
            <FormattedMessage id={'startDemoInstance'} />
          </LoadingButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
