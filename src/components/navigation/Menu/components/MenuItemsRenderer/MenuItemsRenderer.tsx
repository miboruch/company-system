import React, { useContext } from 'react';
import { useParams, matchPath, useLocation } from 'react-router-dom';
import { useAbility } from '@casl/react';

import { menuItems } from './menu.items';
import { MenuContext } from 'providers/MenuContext/MenuContext';
import { CompanyPermissionsContext } from 'guard/context/company-permissions.context';

import { LinkWrapper, StyledLink } from '../../Menu.styles';

const MenuItemsRenderer: React.FC = () => {
  const { pathname } = useLocation();
  const { id } = useParams<{ id: string | undefined }>();

  const ability = useAbility(CompanyPermissionsContext);
  const { setMenuOpen } = useContext(MenuContext);

  const handleCloseMenu = () => setMenuOpen(false);

  const renderAdminRoutes = menuItems(ability, id)
    .filter((route) => route.isVisible)
    .map(({ name, path, icon }) => {
      const isActive = !!matchPath(pathname, { path, exact: true });
      return (
        <LinkWrapper isActive={isActive} key={path}>
          {icon}
          <StyledLink to={path} onClick={handleCloseMenu}>
            {name}
          </StyledLink>
        </LinkWrapper>
      );
    });

  return <>{renderAdminRoutes}</>;
};

export default MenuItemsRenderer;
