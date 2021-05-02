import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import HeaderSlider from './components/HeaderSlider/HeaderSlider';
import Notifications from './components/Notifications/Notifications';
import { ArrowButton, SearchInput, Hamburger } from 'components';
import { AppState } from 'store/store';

import { IconWrapper, NameParagraph, StyledHeader, UserWrapper, MobileWrapper } from './Header.styles';
import { NotificationIcon } from 'styles/iconStyles';
import Avatar from 'components/ui/Avatar/Avatar';

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

  const toggleNotifications = () => setNotificationsOpen(!areNotificationsOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterText && setFilterText(e.target.value);
  };

  const userName = userData && `${userData.name} ${userData.lastName}`;

  return (
    <StyledHeader isInput={!!setFilterText}>
      <Hamburger />
      <SearchInput onChange={setFilterText && handleChange} />
      <UserWrapper>
        {<NameParagraph>{userName}</NameParagraph>}
        {userName && <Avatar name={userName} />}
        <ArrowButton direction={'bottom'} isSmaller={true} onClick={toggleHeaderSlider} />
        <IconWrapper>
          <NotificationIcon onClick={toggleNotifications} />
        </IconWrapper>
        <Notifications isOpen={areNotificationsOpen} setOpen={setNotificationsOpen} />
        <HeaderSlider isOpen={isSliderOpen} setOpen={setSliderOpen} />
      </UserWrapper>
      <MobileWrapper>{userName && <Avatar name={userName} onClick={toggleHeaderSlider} />}</MobileWrapper>
      <HeaderSlider isOpen={isSliderOpen} setOpen={setSliderOpen} isMobile={true} />
    </StyledHeader>
  );
};

export default Header;
