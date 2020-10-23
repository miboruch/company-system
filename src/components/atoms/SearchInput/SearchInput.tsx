import React from 'react';
import { SearchWrapper, StyledInput, SearchIcon } from './SearchInput.styles';

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<Props> = ({ onChange }) => {
  return (
    <>
      {!!onChange && (
        <SearchWrapper>
          <SearchIcon />
          <StyledInput placeholder={'Szukaj'} onChange={onChange} />
        </SearchWrapper>
      )}
    </>
  );
};

export default SearchInput;
