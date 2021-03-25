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

  return (
    <MenuTemplate>
      <GridWrapper pageName={'Ustawienia'} mobilePadding={true} isSettingsPage={true}>
        <StyledList>
          {role === UserRole.Admin
            ? adminSettings.map((adminSetting) => (
                <ListItems
                  key={adminSetting.name}
                  listLength={adminSettings.length}
                  isActive={adminSetting.roleEnum === subcategory}
                  onClick={() => setSubcategory(adminSetting.roleEnum)}
                >
                  <AddNewParagraph style={{ fontSize: '15px' }}>{adminSetting.name}</AddNewParagraph>
                </ListItems>
              ))
            : userSettings.map((userSetting) => (
                <ListItems
                  style={{ marginRight: '2rem' }}
                  key={userSetting.name}
                  listLength={userSettings.length}
                  isActive={userSetting.roleEnum === subcategory}
                  onClick={() => setSubcategory(userSetting.roleEnum)}
                >
                  <AddNewParagraph style={{ fontSize: '15px' }}>{userSetting.name}</AddNewParagraph>
                </ListItems>
              ))}
        </StyledList>
        <ContentWrapper>{renderSettings(subcategory)}</ContentWrapper>
      </GridWrapper>
    </MenuTemplate>
  );
};

export default Settings;
