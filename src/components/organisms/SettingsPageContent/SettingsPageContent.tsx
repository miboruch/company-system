import React, { useState } from 'react';
import { connect } from 'react-redux';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { AppState } from '../../../reducers/rootReducer';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { adminSettings, userSettings, AdminSettingsSubcategories, UserSettingsSubcategories, renderSettings } from './settingsPageData';
import { StyledList, ListItems, Paragraph, ContentWrapper } from './SettingsPageContent.styles';

interface Props {}

type ConnectedProps = Props & LinkStateProps;

const SettingsPageContent: React.FC<ConnectedProps> = ({ role }) => {
  const [subcategory, setSubcategory] = useState<AdminSettingsSubcategories | UserSettingsSubcategories>(UserSettingsSubcategories.AccountSettings);

  return (
    <GridWrapper pageName={'Ustawienia'} mobilePadding={true}>
      <StyledList>
        {role === UserRole.Admin
          ? adminSettings.map((adminSetting) => (
              <ListItems listLength={adminSettings.length} isActive={adminSetting.roleEnum === subcategory} onClick={() => setSubcategory(adminSetting.roleEnum)}>
                <Paragraph>{adminSetting.name}</Paragraph>
              </ListItems>
            ))
          : userSettings.map((userSetting) => (
              <ListItems listLength={userSettings.length} isActive={userSetting.roleEnum === subcategory} onClick={() => setSubcategory(userSetting.roleEnum)}>
                <Paragraph>{userSetting.name}</Paragraph>
              </ListItems>
            ))}
      </StyledList>
      <ContentWrapper>{renderSettings(subcategory)}</ContentWrapper>
    </GridWrapper>
  );
};

interface LinkStateProps {
  role: UserRole;
}

const mapStateToProps = ({ authenticationReducer: { role } }: AppState): LinkStateProps => {
  return { role };
};

export default connect(mapStateToProps)(SettingsPageContent);
