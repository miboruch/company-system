import React from 'react';
import { SearchWrapper, StyledInput, SearchIcon } from './SearchInput.styles';

interface Props {}

const SearchInput: React.FC<Props> = () => {
  return (
    <SearchWrapper>
      <SearchIcon />
      <StyledInput placeholder={'Szukaj'} />
    </SearchWrapper>
  );
};

export default SearchInput;
