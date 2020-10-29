import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { adminMenuItems, userMenuItems } from '../../../utils/menuItems';
import { ButtonWrapper, LinkWrapper, MenuItemsWrapper, MenuWrapper, StyledLink } from './Menu.styles';
import Button from '../../atoms/Button/Button';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { userLogout } from '../../../actions/authenticationActions';
import { AppState } from '../../../reducers/rootReducer';
import { MenuContext } from '../../../providers/MenuContext/MenuContext';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';

type ConnectedProps = LinkDispatchProps & LinkStateProps & RouteComponentProps;

const Menu: React.FC<ConnectedProps> = ({ history, location, match, userLogout, refreshToken, role }) => {
  const { isMenuOpen, setMenuOpen } = useContext(MenuContext);
  return (
    <MenuWrapper isOpen={isMenuOpen}>
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
      <ButtonWrapper>{refreshToken && <Button type={'button'} text={'Wyloguj'} onClick={() => userLogout(refreshToken, () => history.push('/login'))} />}</ButtonWrapper>
    </MenuWrapper>
  );
};

interface LinkStateProps {
  refreshToken: string | null;
  role: UserRole;
}

interface LinkDispatchProps {
  userLogout: (refreshToken: string, successCallback: () => void) => void;
}

const mapStateToProps = ({ authenticationReducer: { refreshToken, role } }: AppState): LinkStateProps => {
  return { refreshToken, role };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
