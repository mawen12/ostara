import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { DISCORD_INVITE_URL, DOCUMENTATION_URL } from '../../../../constants/ui';

type HomeDocumentationProps = {};

export default function HomeDocumentation({}: HomeDocumentationProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant={'h6'} gutterBottom>
          <FormattedMessage id={'documentation'} /> &#x1F4D6;
        </Typography>

        <Typography variant={'body2'} sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
          <FormattedMessage id={'documentationSideGetStarted'} />
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
          <Button variant="outlined" color="primary" href={DOCUMENTATION_URL} target="_blank" rel="noopener noreferrer">
            <FormattedMessage id={'openDocumentation'} />
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id={'joinDiscord'} />
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
