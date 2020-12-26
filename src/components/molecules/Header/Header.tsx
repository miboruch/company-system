import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Hamburger from 'components/atoms/Hamburger/Hamburger';
import HeaderSlider from 'components/molecules/HeaderSlider/HeaderSlider';
import SearchInput from 'components/atoms/SearchInput/SearchInput';
import ArrowButton from 'components/atoms/ArrowButton/ArrowButton';
import Notifications from 'components/organisms/Notifications/Notifications';

import { Direction } from 'types/globalTypes';
import { AppState } from 'store/store';
import { Circle, IconWrapper, NameParagraph, StyledHeader, UserWrapper, MobileCircle } from './Header.styles';
import { NotificationIcon } from 'styles/iconStyles';

interface Props {
  setFilterText?: (filterText: string) => void;
}

const Header: React.FC<Props> = ({ setFilterText }) => {
  const { userData } = useSelector((state: AppState) => state.auth.data);

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
        <ArrowButton direction={Direction.Bottom} isSmaller={true} onClick={toggleHeaderSlider} />
        <IconWrapper>
          <NotificationIcon onClick={toggleNotifications} />
        </IconWrapper>
        <Notifications isOpen={areNotificationsOpen} setOpen={setNotificationsOpen} />
        <HeaderSlider isOpen={isSliderOpen} setOpen={setSliderOpen} />
      </UserWrapper>
      <MobileCircle onClick={toggleHeaderSlider} />
      <HeaderSlider isOpen={isSliderOpen} setOpen={setSliderOpen} isMobile={true} />
    </StyledHeader>
  );
};

export default Header;
