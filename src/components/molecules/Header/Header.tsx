import React from 'react';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import { StyledHeader, Circle, UserWrapper } from './Header.styles';
import SearchInput from '../../atoms/SearchInput/SearchInput';

interface Props {
  setFilterText?: (filterText: string) => void;
}

const Header: React.FC<Props> = ({ setFilterText }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterText && setFilterText(e.target.value);
  };

  return (
    <StyledHeader isInput={!!setFilterText}>
      <Hamburger />
      <SearchInput onChange={setFilterText && handleChange} />
      <UserWrapper>
        <p>Michał Boruch</p>
        <Circle />
      </UserWrapper>
    </StyledHeader>
  );
};

export default Header;
