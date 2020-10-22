import React, { useContext } from 'react';
import { StyledHamburger, InnerHamburger } from './Hamburger.styles';
import { MenuContext } from '../../../providers/MenuContext/MenuContext';

interface Props {}

const Hamburger: React.FC<Props> = () => {
  const { isMenuOpen, toggleMenu } = useContext(MenuContext);
  return (
    <StyledHamburger onClick={() => toggleMenu()}>
      <InnerHamburger isOpen={isMenuOpen} />
    </StyledHamburger>
  );
};

export default Hamburger;
