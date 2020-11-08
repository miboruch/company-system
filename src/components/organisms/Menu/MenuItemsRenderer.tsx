import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { adminRoutes, userRoutes } from '../../../routes/routesDefinition';
import { LinkWrapper, StyledLink } from './Menu.styles';
import { AppState } from '../../../reducers/rootReducer';
import { MenuContext } from '../../../providers/MenuContext/MenuContext';
import { CompanyInterface, UserAuthData } from '../../../types/modelsTypes';

interface Props {}

type ConnectedProps = Props & LinkStateProps & RouteComponentProps;

const MenuItemsRenderer: React.FC<ConnectedProps> = ({ location, role, userData, token, currentCompany }) => {
  const { setMenuOpen } = useContext(MenuContext);

  const condition: boolean = !!(userData && token && currentCompany);

  const renderAdminRoutes = condition
    ? adminRoutes.map(({ name, path, icon }) => (
        <LinkWrapper isActive={path.includes(location.pathname)} key={path}>
          {icon}
          <StyledLink to={path} onClick={() => setMenuOpen(false)}>
            {name}
          </StyledLink>
        </LinkWrapper>
      ))
    : adminRoutes
        .filter((route) => !route.isGuarded)
        .map(({ name, path, icon }) => (
          <LinkWrapper isActive={path.includes(location.pathname)} key={path}>
            {icon}
            <StyledLink to={path} onClick={() => setMenuOpen(false)}>
              {name}
            </StyledLink>
          </LinkWrapper>
        ));

  const renderUserRoutes = condition
    ? userRoutes.map(({ name, path, icon }) => (
        <LinkWrapper isActive={path.includes(location.pathname)} key={path}>
          {icon}
          <StyledLink to={path} onClick={() => setMenuOpen(false)}>
            {name}
          </StyledLink>
        </LinkWrapper>
      ))
    : userRoutes
        .filter((route) => !route.isGuarded)
        .map(({ name, path, icon }) => (
          <LinkWrapper isActive={path.includes(location.pathname)} key={path}>
            {icon}
            <StyledLink to={path} onClick={() => setMenuOpen(false)}>
              {name}
            </StyledLink>
          </LinkWrapper>
        ));

  return <>{role === UserRole.Admin ? renderAdminRoutes : renderUserRoutes}</>;
};

interface LinkStateProps {
  role: UserRole;
  userData: UserAuthData | null;
  token: string | null;
  currentCompany: CompanyInterface | null;
}

const mapStateToProps = ({ authenticationReducer: { role, userData, token }, companyReducer: { currentCompany } }: AppState): LinkStateProps => {
  return { role, userData, token, currentCompany };
};

export default withRouter(connect(mapStateToProps)(MenuItemsRenderer));
