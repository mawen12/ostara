import { FormattedMessage, useIntl } from 'react-intl';
import React, { FunctionComponent, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { useModal } from '@ebay/nice-modal-react';
import { LoadingButton } from '@mui/lab';

export type FolderDetailsFormProps = {
  defaultValues?: FolderFormValues;
  onSubmit: (data: FolderFormValues) => Promise<void>;
  onCancel: () => void;
};

export type FolderFormValues = {
  alias: string;
};

const FolderDetailsForm: FunctionComponent<FolderDetailsFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
}: FolderDetailsFormProps) => {
  const modal = useModal();
  const intl = useIntl();

  const { control, handleSubmit } = useForm<FolderFormValues>({ defaultValues });

  const submitHandler = handleSubmit(async (data): Promise<void> => {
    onSubmit?.(data);
  });

  const cancelHandler = useCallback((): void => {
    onCancel();
  }, [modal]);

  return (
    <>
      <DialogContent>
        <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
          <Controller
            name="alias"
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
                  label={<FormattedMessage id="name" />}
                  type="text"
                  autoComplete="off"
                  autoFocus
                  error={invalid}
                  helperText={error?.message}
                />
              );
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="outlined" color="primary" onClick={cancelHandler}>
          <FormattedMessage id={'cancel'} />
        </Button>
        <LoadingButton variant="contained" color="primary" onClick={submitHandler}>
          <FormattedMessage id={'save'} />
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default FolderDetailsForm;
