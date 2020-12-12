import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import GridWrapper from '../../templates/GridWrapper/GridWrapper';

import { AppState } from '../../../store/store';
import { UserRole } from '../../../ducks/auth/roles/roles';
import { adminSettings, userSettings, AdminSettingsSubcategories, UserSettingsSubcategories, renderSettings } from './settingsPageData';
import { StyledList, ListItems, Paragraph, ContentWrapper } from './SettingsPageContent.styles';
import { AddNewParagraph } from '../../atoms/AddNewButton/AddNewButton.styles';

const SettingsPageContent: React.FC = () => {
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const [subcategory, setSubcategory] = useState<AdminSettingsSubcategories | UserSettingsSubcategories>(UserSettingsSubcategories.AccountSettings);

  return (
    <GridWrapper pageName={'Ustawienia'} mobilePadding={true} isSettingsPage={true}>
      <StyledList>
        {role === UserRole.Admin
          ? adminSettings.map((adminSetting) => (
              <ListItems key={adminSetting.name} listLength={adminSettings.length} isActive={adminSetting.roleEnum === subcategory} onClick={() => setSubcategory(adminSetting.roleEnum)}>
                <AddNewParagraph style={{fontSize: '15px'}}>{adminSetting.name}</AddNewParagraph>
              </ListItems>
            ))
          : userSettings.map((userSetting) => (
              <ListItems key={userSetting.name} listLength={userSettings.length} isActive={userSetting.roleEnum === subcategory} onClick={() => setSubcategory(userSetting.roleEnum)}>
                <AddNewParagraph style={{fontSize: '15px'}}>{userSetting.name}</AddNewParagraph>
              </ListItems>
            ))}
      </StyledList>
      <ContentWrapper>{renderSettings(subcategory)}</ContentWrapper>
    </GridWrapper>
  );
};

export default SettingsPageContent;
