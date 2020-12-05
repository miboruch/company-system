import React, { useContext } from 'react';

import { StyledHamburger, InnerHamburger } from './Hamburger.styles';
import { MenuContext } from '../../../providers/MenuContext/MenuContext';

const Hamburger: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useContext(MenuContext);
  return (
    <StyledHamburger onClick={() => toggleMenu()}>
      <InnerHamburger isOpen={isMenuOpen} />
    </StyledHamburger>
  );
};

export default Hamburger;
