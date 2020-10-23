import React from 'react';
import { connect } from 'react-redux';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import { StyledHeader, Circle, UserWrapper, NameParagraph } from './Header.styles';
import SearchInput from '../../atoms/SearchInput/SearchInput';
import { AppState } from '../../../reducers/rootReducer';
import { UserAuthData } from '../../../types/modelsTypes';

interface Props {
  setFilterText?: (filterText: string) => void;
}

type ConnectedProps = Props & LinkStateProps;

const Header: React.FC<ConnectedProps> = ({ setFilterText, userData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterText && setFilterText(e.target.value);
  };

  return (
    <StyledHeader isInput={!!setFilterText}>
      <Hamburger />
      <SearchInput onChange={setFilterText && handleChange} />
      <UserWrapper>
        {userData?.name && userData.lastName && (
          <NameParagraph>
            {userData.name} {userData.lastName}
          </NameParagraph>
        )}
        <Circle />
      </UserWrapper>
    </StyledHeader>
  );
};

interface LinkStateProps {
  userData: UserAuthData | null;
}

const mapStateToProps = ({ authenticationReducer: { userData } }: AppState): LinkStateProps => {
  return { userData };
};

export default connect(mapStateToProps)(Header);
