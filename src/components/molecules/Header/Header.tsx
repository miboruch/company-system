import React from 'react';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import { StyledHeader, Circle } from './Header.styles';

interface Props {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<Props> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <StyledHeader>
      <Hamburger isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Circle />
    </StyledHeader>
  );
};

export default Header;
