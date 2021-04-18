import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';

import { AppState } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { adminRoutes, userRoutes } from 'routes/menu.routes';
import { LinkWrapper, StyledLink } from './Menu.styles';
import { MenuContext } from 'providers/MenuContext/MenuContext';

const MenuItemsRenderer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { url } = useRouteMatch();

  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { userData } = useSelector((state: AppState) => state.auth.data);
  const { token } = useSelector((state: AppState) => state.auth.tokens);
  const { currentCompany } = useSelector((state: AppState) => state.company.currentCompany);
  const { setMenuOpen } = useContext(MenuContext);

  const condition: boolean = !!(userData && token && currentCompany);

  const handleCloseMenu = () => setMenuOpen(false);

  const renderAdminRoutes = adminRoutes
    .filter((route) => (condition ? route : !route.isGuarded))
    .map(({ name, path, main, icon }) => (
      <LinkWrapper isActive={url.includes(main)} key={main}>
        {icon}
        <StyledLink to={`/company/${id}${path}`} onClick={handleCloseMenu}>
          {name}
        </StyledLink>
      </LinkWrapper>
    ));

  const renderUserRoutes = userRoutes
    .filter((route) => (condition ? route : !route.isGuarded))
    .map(({ name, path, main, icon }) => (
      <LinkWrapper isActive={url.includes(main)} key={main}>
        {icon}
        <StyledLink to={`/company/${id}${path}`} onClick={handleCloseMenu}>
          {name}
        </StyledLink>
      </LinkWrapper>
    ));

  return <>{role === UserRole.Admin ? renderAdminRoutes : renderUserRoutes}</>;
};

export default MenuItemsRenderer;
