import React, { useContext } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useAbility } from '@casl/react';

import { menuItems } from 'routes/menu.routes';
import { LinkWrapper, StyledLink } from './Menu.styles';
import { MenuContext } from 'providers/MenuContext/MenuContext';
import { CompanyPermissionsContext } from 'guard/context/company-permissions.context';

const MenuItemsRenderer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { url } = useRouteMatch();

  const ability = useAbility(CompanyPermissionsContext);

  const { setMenuOpen } = useContext(MenuContext);

  const handleCloseMenu = () => setMenuOpen(false);

  const renderAdminRoutes = menuItems(ability)
    .filter((route) => route.isVisible)
    .map(({ name, path, main, icon }) => (
      <LinkWrapper isActive={url.includes(main)} key={main}>
        {icon}
        <StyledLink to={`/company/${id}${path}`} onClick={handleCloseMenu}>
          {name}
        </StyledLink>
      </LinkWrapper>
    ));

  return <>{renderAdminRoutes}</>;
};

export default MenuItemsRenderer;
