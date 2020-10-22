import React, { useState } from 'react';
import Menu from '../../organisms/Menu/Menu';
import Header from '../../molecules/Header/Header';
import { MenuTemplateWrapper } from './MenuTemplate.styles';

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
      {/*<Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />*/}
      <Menu isOpen={isMenuOpen} />
      {children}
    </MenuTemplateWrapper>
  );
};

export default MenuTemplate;
