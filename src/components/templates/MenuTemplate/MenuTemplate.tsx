import React, { useState } from 'react';
import styled from 'styled-components';
import Menu from '../../organisms/Menu/Menu';
import Hamburger from '../../atoms/Hamburger/Hamburger';

const MenuTemplateWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
`;

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
      <Hamburger isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Menu />
      {children}
    </MenuTemplateWrapper>
  );
};

export default MenuTemplate;
