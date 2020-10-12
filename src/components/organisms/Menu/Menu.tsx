import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { menuItems } from '../../../utils/menuItems';
import { MenuWrapper, LinkWrapper, StyledLink, MenuItemsWrapper, ButtonWrapper } from './Menu.styles';
import Button from '../../atoms/Button/Button';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/appActionTypes';
import { bindActionCreators } from 'redux';
import { userLogout } from '../../../actions/authenticationActions';
import { AppState } from '../../../reducers/rootReducer';

type ConnectedProps = Props & LinkDispatchProps & LinkStateProps;

interface Props extends RouteComponentProps {
  isOpen: boolean;
}

const Menu: React.FC<ConnectedProps> = ({ history, location, isOpen, userLogout, refreshToken }) => {
  return (
    <MenuWrapper isOpen={isOpen}>
      <MenuItemsWrapper>
        {menuItems.map(({ name, link, icon }) => (
          <LinkWrapper isActive={link.includes(location.pathname)} key={link}>
            {icon}
            <StyledLink to={link}>{name}</StyledLink>
          </LinkWrapper>
        ))}
      </MenuItemsWrapper>
      <ButtonWrapper>{refreshToken && <Button type={'button'} text={'Wyloguj'} onClick={() => userLogout(refreshToken, () => history.push('/login'))} />}</ButtonWrapper>
    </MenuWrapper>
  );
};

interface LinkStateProps {
  refreshToken: string | null;
}

interface LinkDispatchProps {
  userLogout: (refreshToken: string, successCallback: () => void) => void;
}

const mapStateToProps = ({ authenticationReducer: { refreshToken } }: AppState): LinkStateProps => {
  return { refreshToken };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    userLogout: bindActionCreators(userLogout, dispatch)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
