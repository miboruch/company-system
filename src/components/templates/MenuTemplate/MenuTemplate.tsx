import React, { useState } from 'react';
import Menu from '../../organisms/Menu/Menu';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import { MenuTemplateWrapper, Header } from './MenuTemplate.styles';

interface Props {
  children: React.ReactNode;
}

const MenuTemplate: React.FC<Props> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setMenuOpen(!isMenuOpen);
  };

  const setIsMenuOpenState = (isOpen: boolean): void => {
    setMenuOpen(isOpen);
  };

  return (
    <MenuTemplateWrapper>
      <Header>
        <Hamburger isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </Header>
      <Menu isOpen={isMenuOpen} />
      {children}
    </MenuTemplateWrapper>
  );
};

export default MenuTemplate;
