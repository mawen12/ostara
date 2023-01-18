import { useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import { useUi } from 'renderer/contexts/UiContext';
import MenuPopover from 'renderer/components/menu/popup/MenuPopover';
import { FormattedMessage } from 'react-intl';
import MAvatar from 'renderer/components/common/MAvatar';
import { bindMenu, usePopupState } from 'material-ui-popup-state/hooks';
import CustomMenuItem from 'renderer/components/menu/item/CustomMenuItem';
import { useNavigate } from 'react-router-dom';
import { urls } from 'renderer/routes/urls';

export default function AccountMenu() {
  const { developerMode, toggleDeveloperMode, darkMode, toggleDarkMode, isRtl } = useUi();
  const navigate = useNavigate();

  const menuState = usePopupState({ variant: 'popover' });

  const openHandler = useCallback((): void => {
    menuState.open();
  }, [menuState]);

  const toggleDeveloperModeHandler = useCallback((): void => {
    toggleDeveloperMode();
    menuState.close();
  }, [toggleDeveloperMode, menuState]);

  const toggleDarkModeHandler = useCallback((): void => {
    toggleDarkMode();
    menuState.close();
  }, [toggleDarkMode, menuState]);

  const settingsHandler = useCallback((): void => {
    navigate(urls.settings.url);
    menuState.close();
  }, [navigate, menuState]);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton
          ref={menuState.setAnchorEl}
          onClick={openHandler}
          sx={{
            padding: 0,
            width: 48,
            height: 48,
            ...(menuState.isOpen && { bgcolor: 'action.selected' }),
          }}
        >
          <MAvatar variant={'circular'} color={'primary'}>
            {'SB'}
          </MAvatar>
        </IconButton>
      </Box>

      <MenuPopover direction={isRtl ? 'left' : 'right'} {...bindMenu(menuState)}>
        <CustomMenuItem
          icon={'DeveloperModeOutlined'}
          text={
            <>
              <FormattedMessage id={'developerMode'} /> <FormattedMessage id={developerMode ? 'on' : 'off'} />
            </>
          }
          onClick={toggleDeveloperModeHandler}
        />
        <CustomMenuItem
          icon={darkMode ? 'LightModeOutlined' : 'DarkModeOutlined'}
          text={<FormattedMessage id={darkMode ? 'lightMode' : 'darkMode'} />}
          onClick={toggleDarkModeHandler}
        />
        <CustomMenuItem
          icon={'SettingsOutlined'}
          text={<FormattedMessage id={'settings'} />}
          onClick={settingsHandler}
        />
      </MenuPopover>
    </>
  );
}
