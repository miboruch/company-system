import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { menuItems } from '../../../utils/menuItems';
import { MenuWrapper, LinkWrapper, StyledLink, MenuItemsWrapper } from './Menu.styles';

interface Props extends RouteComponentProps {
  isOpen: boolean;
}

const Menu: React.FC<Props> = ({ location, isOpen }) => {
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
    </MenuWrapper>
  );
};

export default withRouter(Menu);
