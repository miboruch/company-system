import React, { useState } from 'react';
import { connect } from 'react-redux';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import { Circle, IconWrapper, NameParagraph, StyledHeader, UserWrapper } from './Header.styles';
import SearchInput from '../../atoms/SearchInput/SearchInput';
import { AppState } from '../../../reducers/rootReducer';
import { UserAuthData } from '../../../types/modelsTypes';
import Notifications from '../../organisms/Notifications/Notifications';
import { NotificationIcon } from '../../../styles/iconStyles';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';
import { Direction } from '../../../types/globalTypes';

interface Props {
  setFilterText?: (filterText: string) => void;
}

type ConnectedProps = Props & LinkStateProps;

const Header: React.FC<ConnectedProps> = ({ setFilterText, userData }) => {
  const [areNotificationsOpen, setNotificationsOpen] = useState<boolean>(false);
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
        <IconWrapper>
          <NotificationIcon onClick={() => setNotificationsOpen(!areNotificationsOpen)} />
        </IconWrapper>
        <Notifications isOpen={areNotificationsOpen} setOpen={setNotificationsOpen} />
        <ArrowButton direction={Direction.Bottom} />
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
