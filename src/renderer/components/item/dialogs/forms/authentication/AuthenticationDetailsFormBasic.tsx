import React, { FunctionComponent } from 'react';
import { AuthenticationDetailsFormProps } from './AuthenticationDetailsForm';
import { TextField } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import { Controller, useFormContext } from 'react-hook-form';
import { Authentication$Typed } from '../../../../../../common/manual_definitions';

const AuthenticationDetailsFormBasic: FunctionComponent<
  AuthenticationDetailsFormProps
> = ({}: AuthenticationDetailsFormProps) => {
  const intl = useIntl();

  const { control } = useFormContext<{ authentication: Authentication$Typed }>();

  return (
    <>
      <Controller
        name="authentication.username"
        rules={{
          required: intl.formatMessage({ id: 'requiredField' }),
        }}
        control={control}
        defaultValue=""
        render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => {
          return (
            <TextField
              {...field}
              inputRef={ref}
              margin="normal"
              required
              fullWidth
              label={<FormattedMessage id="username" />}
              type="text"
              autoComplete="off"
              error={invalid}
              helperText={error?.message}
            />
          );
        }}
      />

      <Controller
        name="authentication.password"
        rules={{
          required: intl.formatMessage({ id: 'requiredField' }),
        }}
        control={control}
        defaultValue=""
        render={({ field: { ref, ...field }, fieldState: { invalid, error } }) => {
          return (
            <TextField
              {...field}
              inputRef={ref}
              margin="normal"
              required
              fullWidth
              label={<FormattedMessage id="password" />}
              type="text"
              autoComplete="off"
              error={invalid}
              helperText={error?.message}
            />
          );
        }}
      />
    </>
  );
};

export default AuthenticationDetailsFormBasic;
