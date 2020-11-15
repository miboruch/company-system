import React, { useState } from 'react';
import { connect } from 'react-redux';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import HeaderSlider from '../HeaderSlider/HeaderSlider';
import SearchInput from '../../atoms/SearchInput/SearchInput';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';
import Notifications from '../../organisms/Notifications/Notifications';
import { Direction } from '../../../types/globalTypes';
import { AppState } from '../../../reducers/rootReducer';
import { UserAuthData } from '../../../types/modelsTypes';
import { Circle, IconWrapper, NameParagraph, StyledHeader, UserWrapper, MobileCircle } from './Header.styles';
import { NotificationIcon } from '../../../styles/iconStyles';

interface Props {
  setFilterText?: (filterText: string) => void;
}

type ConnectedProps = Props & LinkStateProps;

const Header: React.FC<ConnectedProps> = ({ setFilterText, userData }) => {
  const [areNotificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [isSliderOpen, setSliderOpen] = useState<boolean>(false);

  const toggleHeaderSlider = () => {
    setSliderOpen(!isSliderOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!areNotificationsOpen);
  };

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
        <ArrowButton direction={Direction.Bottom} isSmaller={true} onClick={() => toggleHeaderSlider()} />
        <IconWrapper>
          <NotificationIcon onClick={() => toggleNotifications()} />
        </IconWrapper>
        <Notifications isOpen={areNotificationsOpen} setOpen={setNotificationsOpen} />
        <HeaderSlider isOpen={isSliderOpen} setOpen={setSliderOpen} />
      </UserWrapper>
      <MobileCircle onClick={() => toggleHeaderSlider()} />
      <HeaderSlider isOpen={isSliderOpen} setOpen={setSliderOpen} isMobile={true} />
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
