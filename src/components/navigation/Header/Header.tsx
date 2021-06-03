import React, { useState } from 'react';

import HeaderSlider from './components/HeaderSlider/HeaderSlider';
import Notifications from './components/Notifications/Notifications';
import Avatar from 'components/ui/Avatar/Avatar';
import { ArrowButton, SearchInput, Hamburger } from 'components';
import { useUser } from 'components/hooks';

import { IconWrapper, NameParagraph, StyledHeader, UserWrapper, MobileWrapper } from './Header.styles';
import { NotificationIcon } from 'styles/iconStyles';

interface Props {
  setFilterText?: (filterText: string) => void;
  color?: string;
}

const Header: React.FC<Props> = ({ setFilterText, color }) => {
  const { user } = useUser();

  const [areNotificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [isSliderOpen, setSliderOpen] = useState<boolean>(false);

  const toggleHeaderSlider = () => {
    setSliderOpen(!isSliderOpen);
  };

  const toggleNotifications = () => setNotificationsOpen(!areNotificationsOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterText && setFilterText(e.target.value);
  };

  const userName = user && `${user.name} ${user.lastName}`;

  return (
    <StyledHeader isInput={!!setFilterText} color={color}>
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
