import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import MenuItemsRenderer from 'components/organisms/Menu/MenuItemsRenderer';

import { AppState, useAppDispatch } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { changeUserRoleTo } from 'ducks/auth/roles/roles-creators';
import { MenuContext } from 'providers/MenuContext/MenuContext';
import { CompanyName, MenuItemsWrapper, MenuWrapper, RedirectPanel, StyledMenuSvg, ArrowIcon, ArrowWrapper, RedirectText } from './Menu.styles';

const Menu: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useAppDispatch();
  const { currentCompany } = useSelector((state: AppState) => state.company.currentCompany);
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { isMenuOpen } = useContext(MenuContext);

  const changePanelTo = `Przejdź do panelu ${role === UserRole.Admin ? 'użytkownika' : 'administratora'}`;

  const handleChangeRole = () => {
    if (role === UserRole.Admin) {
      dispatch(changeUserRoleTo(UserRole.User, () => history.push('/user/companies')));
    } else {
      dispatch(changeUserRoleTo(UserRole.Admin, () => history.push('/admin/companies')));
    }
  };

  return (
    <MenuWrapper isOpen={isMenuOpen}>
      {currentCompany && <CompanyName>{currentCompany.name}</CompanyName>}
      <MenuItemsWrapper>
        <MenuItemsRenderer />
      </MenuItemsWrapper>
      <RedirectPanel>
        <StyledMenuSvg />
        <RedirectText>{changePanelTo}</RedirectText>
        <ArrowWrapper onClick={handleChangeRole}>
          <ArrowIcon />
        </ArrowWrapper>
      </RedirectPanel>
    </MenuWrapper>
  );
};

export default withRouter(Menu);
