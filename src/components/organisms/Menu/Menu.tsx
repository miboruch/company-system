import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CompanyName, MenuItemsWrapper, MenuWrapper } from './Menu.styles';
import { AppState, useAppDispatch } from '../../../store/test-store';
import { MenuContext } from '../../../providers/MenuContext/MenuContext';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { ReactComponent as MenuSvg } from '../../../assets/icons/menuDraw.svg';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg';

import styled from 'styled-components';
import { changeUserRoleTo } from '../../../ducks/auth/roles/roles-creators';
import MenuItemsRenderer from './MenuItemsRenderer';

const RedirectPanel = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledMenuSvg = styled(MenuSvg)`
  width: 220px;
  height: 150px;

  ${({ theme }) => theme.mq.hdReady} {
    width: 220px;
    height: 180px;
  }
`;

const ArrowIcon = styled(Arrow)`
  fill: #fff;
  width: 15px;
  height: 15px;
`;

const ArrowWrapper = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const RedirectText = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.demi};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1rem;
`;

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
