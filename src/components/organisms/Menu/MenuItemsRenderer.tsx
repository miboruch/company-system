import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { adminRoutes, userRoutes } from '../../../routes/routesDefinition';
import { LinkWrapper, StyledLink } from './Menu.styles';
import { AppState } from '../../../store/test-store';
import { MenuContext } from '../../../providers/MenuContext/MenuContext';

const MenuItemsRenderer: React.FC<RouteComponentProps> = ({ location }) => {
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { userData } = useSelector((state: AppState) => state.auth.data);
  const { token } = useSelector((state: AppState) => state.auth.tokens);
  const { currentCompany } = useSelector((state: AppState) => state.company.currentCompany);
  const { setMenuOpen } = useContext(MenuContext);

  const condition: boolean = !!(userData && token && currentCompany);

  const renderAdminRoutes = adminRoutes
    .filter((route) => (condition ? route : !route.isGuarded))
    .map(({ name, path, icon }) => (
      <LinkWrapper isActive={path.includes(location.pathname)} key={path}>
        {icon}
        <StyledLink to={path} onClick={() => setMenuOpen(false)}>
          {name}
        </StyledLink>
      </LinkWrapper>
    ));

  const renderUserRoutes = userRoutes
    .filter((route) => (condition ? route : !route.isGuarded))
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

export default withRouter(MenuItemsRenderer);
