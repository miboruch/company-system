import React from 'react';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import { StyledHeader, Circle, UserWrapper } from './Header.styles';
import Input from '../../atoms/Input/Input';
import SearchInput from '../../atoms/SearchInput/SearchInput';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <StyledHeader>
      <Hamburger />
      <SearchInput />
      <UserWrapper>
        <p>Michał Boruch</p>
        <Circle />
      </UserWrapper>
    </StyledHeader>
  );
};

export default Header;
