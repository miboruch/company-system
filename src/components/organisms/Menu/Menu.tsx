import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import MenuItemsRenderer from './MenuItemsRenderer';

import { changeUserRoleTo } from '../../../ducks/auth/roles/roles-creators';
import { AppState, useAppDispatch } from '../../../store/store';
import { UserRole } from '../../../ducks/auth/roles/roles';
import { MenuContext } from '../../../providers/MenuContext/MenuContext';
import { CompanyName, MenuItemsWrapper, MenuWrapper, RedirectPanel, StyledMenuSvg, ArrowIcon, ArrowWrapper, RedirectText } from './Menu.styles';

const Menu: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useAppDispatch();
  const { currentCompany } = useSelector((state: AppState) => state.company.currentCompany);
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { isMenuOpen } = useContext(MenuContext);

  const changeRole = () => {
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
        <RedirectText>Przejdź do panelu {role === UserRole.Admin ? 'użytkownika' : 'administratora'}</RedirectText>
        <ArrowWrapper onClick={() => changeRole()}>
          <ArrowIcon />
        </ArrowWrapper>
      </RedirectPanel>
    </MenuWrapper>
  );
};

export default withRouter(Menu);
