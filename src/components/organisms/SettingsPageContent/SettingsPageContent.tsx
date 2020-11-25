import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { AppState } from '../../../store/test-store';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { adminSettings, userSettings, AdminSettingsSubcategories, UserSettingsSubcategories, renderSettings } from './settingsPageData';
import { StyledList, ListItems, Paragraph, ContentWrapper } from './SettingsPageContent.styles';

const SettingsPageContent: React.FC = () => {
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const [subcategory, setSubcategory] = useState<AdminSettingsSubcategories | UserSettingsSubcategories>(UserSettingsSubcategories.AccountSettings);

  return (
    <GridWrapper pageName={'Ustawienia'} mobilePadding={true} isSettingsPage={true}>
      <StyledList>
        {role === UserRole.Admin
          ? adminSettings.map((adminSetting) => (
              <ListItems key={adminSetting.name} listLength={adminSettings.length} isActive={adminSetting.roleEnum === subcategory} onClick={() => setSubcategory(adminSetting.roleEnum)}>
                <Paragraph>{adminSetting.name}</Paragraph>
              </ListItems>
            ))
          : userSettings.map((userSetting) => (
              <ListItems key={userSetting.name} listLength={userSettings.length} isActive={userSetting.roleEnum === subcategory} onClick={() => setSubcategory(userSetting.roleEnum)}>
                <Paragraph>{userSetting.name}</Paragraph>
              </ListItems>
            ))}
      </StyledList>
      <ContentWrapper>{renderSettings(subcategory)}</ContentWrapper>
    </GridWrapper>
  );
};

export default SettingsPageContent;
