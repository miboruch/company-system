import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { MenuTemplate, GridWrapper } from 'components';
import { UserRole } from 'ducks/auth/roles/roles';
import { renderSettings, adminSettings, userSettings, AdminSettingsType, UserSettingsType } from './settings.config';

import { AddNewParagraph } from 'components/ui/AddNewButton/AddNewButton.styles';
import { ContentWrapper, ListItems, StyledList } from './Settings.styles';

import { AppState } from 'store/store';

const Settings: React.FC = () => {
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const [subcategory, setSubcategory] = useState<AdminSettingsType | UserSettingsType>('account');

  const settingsList = role === UserRole.Admin ? adminSettings : userSettings;

  return (
    <MenuTemplate>
      <GridWrapper pageName={'Ustawienia'} mobilePadding={true} isSettingsPage={true}>
        <StyledList>
          {settingsList.map((settingsItem) => (
            <ListItems
              key={settingsItem.name}
              listLength={settingsList.length}
              isActive={settingsItem.roleEnum === subcategory}
              onClick={() => setSubcategory(settingsItem.roleEnum)}
            >
              <AddNewParagraph style={{ fontSize: '15px' }}>{settingsItem.name}</AddNewParagraph>
            </ListItems>
          ))}
        </StyledList>
        <ContentWrapper>{renderSettings(subcategory)}</ContentWrapper>
        {/*TODO: nested routes*/}
      </GridWrapper>
    </MenuTemplate>
  );
};

export default Settings;
