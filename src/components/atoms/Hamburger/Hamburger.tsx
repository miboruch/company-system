import React from 'react';
import { StyledHamburger, InnerHamburger } from './Hamburger.styles';

interface Props {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Hamburger: React.FC<Props> = ({ isOpen, toggleMenu }) => {
  return (
    <StyledHamburger onClick={() => toggleMenu()}>
      <InnerHamburger isOpen={isOpen} />
    </StyledHamburger>
  );
};

export default Hamburger;
