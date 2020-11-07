import React, { useState } from 'react';
import { connect } from 'react-redux';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { List } from '../../../styles/shared';
import styled from 'styled-components';
import { AppState } from '../../../reducers/rootReducer';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';

const StyledList = styled(List)`
  display: flex;
  flex-direction: row;

  ${({ theme }) => theme.mq.hdReady} {
    flex-direction: column;
  }
`;

interface ListItemsInterface {
  listLength: number;
  isActive: boolean;
}

const ListItems = styled.div<ListItemsInterface>`
  color: ${({ theme, isActive }) => (isActive ? theme.colors.dark : theme.colors.gray)};
  transition: color 0.5s ease, background-color 0.5s ease;
  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    background-color: ${({ theme, isActive }) => isActive && theme.colors.backgroundHover};
    height: ${({ listLength }) => listLength && `calc(100% / ${listLength})`};
    display: grid;
    place-items: center;
    flex-direction: column;
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.font.weight.book};
  color: inherit;

  ${({ theme }) => theme.mq.hdReady} {
    font-size: 28px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    height: 100%;
    grid-area: content;
  }
`;

export enum AdminSettingsSubcategories {
  AccountSettings = 'accountSettings',
  CompanySettings = 'companySettings',
  AddAdmin = 'addAdmin'
}

export enum UserSettingsSubcategories {
  AccountSettings = 'accountSettings'
}

interface SettingsInterface {
  name: string;
  roleEnum: AdminSettingsSubcategories | UserSettingsSubcategories;
}

interface Props {}

type ConnectedProps = Props & LinkStateProps;

const SettingsPageContent: React.FC<ConnectedProps> = ({ role }) => {
  const [subcategory, setSubcategory] = useState<AdminSettingsSubcategories | UserSettingsSubcategories>(UserSettingsSubcategories.AccountSettings);

  const adminSettings: SettingsInterface[] = [
    {
      name: 'Ustawienia konta',
      roleEnum: AdminSettingsSubcategories.AccountSettings
    },
    {
      name: 'Edycja firmy',
      roleEnum: AdminSettingsSubcategories.CompanySettings
    },
    {
      name: 'Dodaj administratorów',
      roleEnum: AdminSettingsSubcategories.AddAdmin
    }
  ];

  const userSettings: SettingsInterface[] = [
    {
      name: 'Ustawienia konta',
      roleEnum: UserSettingsSubcategories.AccountSettings
    }
  ];

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
      <ContentWrapper>
        <p>Test</p>
      </ContentWrapper>
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
