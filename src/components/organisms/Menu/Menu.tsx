import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { adminMenuItems, userMenuItems } from '../../../utils/menuItems';
import { ButtonWrapper, CompanyName, LinkWrapper, MenuItemsWrapper, MenuWrapper, StyledLink } from './Menu.styles';
import Button from '../../atoms/Button/Button';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { setUserRole, userLogout } from '../../../actions/authenticationActions';
import { AppState } from '../../../reducers/rootReducer';
import { MenuContext } from '../../../providers/MenuContext/MenuContext';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { CompanyInterface } from '../../../types/modelsTypes';
import { ReactComponent as MenuSvg } from '../../../assets/icons/menuDraw.svg';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg';

import styled from 'styled-components';
import { changeUserRole } from '../../../actions/toggleActions';

const RedirectPanel = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

type ConnectedProps = LinkDispatchProps & LinkStateProps & RouteComponentProps;

const Menu: React.FC<ConnectedProps> = ({ history, location, match, userLogout, setUserRole, changeUserRole, refreshToken, role, currentCompany }) => {
  const { isMenuOpen, setMenuOpen } = useContext(MenuContext);

  const changeRole = () => {
    if (role === UserRole.Admin) {
      setUserRole(UserRole.User);
      changeUserRole(UserRole.User, () => history.push('/user/companies'));
    } else {
      setUserRole(UserRole.Admin);
      changeUserRole(UserRole.Admin, () => history.push('/admin/companies'));
    }
  };

  return (
    <MenuWrapper isOpen={isMenuOpen}>
      {currentCompany && <CompanyName>{currentCompany.name}</CompanyName>}
      <MenuItemsWrapper>
        {role === UserRole.Admin
          ? adminMenuItems.map(({ name, link, icon }) => (
              <LinkWrapper isActive={link.includes(location.pathname)} key={link}>
                {icon}
                <StyledLink to={link} onClick={() => setMenuOpen(false)}>
                  {name}
                </StyledLink>
              </LinkWrapper>
            ))
          : userMenuItems.map(({ name, link, icon }) => (
              <LinkWrapper isActive={link.includes(location.pathname)} key={link}>
                {icon}
                <StyledLink to={link} onClick={() => setMenuOpen(false)}>
                  {name}
                </StyledLink>
              </LinkWrapper>
            ))}
      </MenuItemsWrapper>
      <RedirectPanel>
        <StyledMenuSvg />
        <RedirectText>Przejdź do panelu {role === UserRole.Admin ? 'użytkownika' : 'admina'}</RedirectText>
        <ArrowWrapper onClick={() => changeRole()}>
          <ArrowIcon />
        </ArrowWrapper>
      </RedirectPanel>
      <ButtonWrapper>{refreshToken && <Button type={'button'} text={'Wyloguj'} onClick={() => userLogout(refreshToken, () => history.push('/login'))} />}</ButtonWrapper>
    </MenuWrapper>
  );
};

interface LinkStateProps {
  refreshToken: string | null;
  role: UserRole;
  currentCompany: CompanyInterface | null;
}

interface LinkDispatchProps {
  userLogout: (refreshToken: string, successCallback: () => void) => void;
  changeUserRole: (role: UserRole, callback: () => void) => void;
  setUserRole: (role: UserRole) => void;
}

const mapStateToProps = ({ authenticationReducer: { refreshToken, role }, companyReducer: { currentCompany } }: AppState): LinkStateProps => {
  return { refreshToken, role, currentCompany };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch),
    changeUserRole: bindActionCreators(changeUserRole, dispatch),
    setUserRole: bindActionCreators(setUserRole, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
