import React from 'react';
import { menuItems } from '../../../utils/menuItems';
import { MenuWrapper, LinkWrapper, StyledLink, MenuItemsWrapper } from './Menu.styles';

interface Props {
  isOpen: boolean;
}

const Menu: React.FC<Props> = ({ isOpen }) => {
  return (
    <MenuWrapper isOpen={isOpen}>
      <MenuItemsWrapper>
        {menuItems.map(({ name, link, icon }, index) => (
          <LinkWrapper isActive={index === 0}>
            {icon}
            <StyledLink to={link}>{name}</StyledLink>
          </LinkWrapper>
        ))}
      </MenuItemsWrapper>
    </MenuWrapper>
  );
};

export default Menu;
