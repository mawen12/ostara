import React, { useMemo } from 'react';
import { Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { COMPONENTS_SPACING, NAVIGATOR_ITEM_HEIGHT } from 'renderer/constants/ui';
import { InstanceRO } from '../../../../common/generated_definitions';
import { FormattedMessage } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useGetInstanceEnvQuery } from '../../../apis/requests/instance/env/getInstanceEnv';
import { useUpdateEffect } from 'react-use';
import { isInstanceInactive } from '../../../utils/itemUtils';

type InstanceActiveProfilesProps = { item: InstanceRO };

export default function InstanceActiveProfiles({ item }: InstanceActiveProfilesProps) {
  const instanceInactive = useMemo<boolean>(() => isInstanceInactive(item), [item]);

  const envState = useGetInstanceEnvQuery(
    { instanceId: item.id },
    { enabled: !instanceInactive, disableGlobalError: true }
  );

  useUpdateEffect(() => {
    if (!instanceInactive) {
      envState.refetch();
    }
  }, [item.health.status]);

  const status = useMemo<'error' | 'success' | 'loading' | 'empty' | 'inactive'>(() => {
    if (instanceInactive) {
      return 'inactive';
    }
    if (envState.error) {
      return 'error';
    }
    if (!envState.data) {
      return 'loading';
    }
    if (!envState.data.activeProfiles?.length) {
      return 'empty';
    }
    return 'success';
  }, [instanceInactive, envState]);

  return (
    <Box
      sx={{
        height: NAVIGATOR_ITEM_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <>
        {status === 'inactive' && (
          <Typography variant={'caption'} sx={{ color: 'text.secondary', px: COMPONENTS_SPACING }}>
            <FormattedMessage id={'cannotConnectToInstance'} />
          </Typography>
        )}
        {status === 'error' && (
          <Typography variant={'caption'} sx={{ color: 'error.main', px: COMPONENTS_SPACING }}>
            <FormattedMessage id={'errorLoadingActiveProfiles'} />
          </Typography>
        )}
        {status === 'loading' && (
          <Typography variant={'caption'} sx={{ color: 'text.secondary', px: COMPONENTS_SPACING }}>
            <FormattedMessage id={'loadingActiveProfiles'} />
          </Typography>
        )}
        {status === 'empty' && (
          <Typography variant={'caption'} sx={{ color: 'text.secondary', px: COMPONENTS_SPACING }}>
            <FormattedMessage id={'noActiveProfiles'} />
          </Typography>
        )}
        {status === 'success' && (
          <Box sx={{ width: '100%' }}>
            <PerfectScrollbar options={{ wheelPropagation: true, suppressScrollY: true }}>
              <Stack
                direction={'row'}
                spacing={1}
                alignItems={'center'}
                sx={{ height: '100%', display: 'inline-flex', px: COMPONENTS_SPACING }}
              >
                {envState.data?.activeProfiles?.map((profile) => (
                  <Tooltip title={<FormattedMessage id={'activeProfile'} />} key={profile}>
                    <Chip label={profile} size={'small'} color={'default'} />
                  </Tooltip>
                ))}
              </Stack>
            </PerfectScrollbar>
          </Box>
        )}
      </>
    </Box>
  );
}
