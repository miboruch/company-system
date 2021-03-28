import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { AppState } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { useAppDispatch } from 'store/store';
import { useOutsideClick } from 'components/hooks';
import { notificationsAnimation } from 'animations/animations';
import { logout } from 'ducks/auth/logout/logout-creators';
import { LogoutIcon } from 'styles/iconStyles';
import { StyledWrapper, SliderItem, Content, Text } from './HeaderSlider.styles';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile?: boolean;
}

type ConnectedProps = Props & RouteComponentProps;

const HeaderSlider: React.FC<ConnectedProps> = ({ history, isOpen, setOpen, isMobile }) => {
  const dispatch = useAppDispatch();
  const { role } = useSelector((state: AppState) => state.auth.roles);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useOutsideClick(contentRef, isOpen, () => setOpen(false));

  useEffect(() => {
    notificationsAnimation(tl, wrapperRef, contentRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  const handleSliderItemClick = () => (role === UserRole.User ? history.push('/user/settings') : history.push('/admin/settings'));
  const handleLogout = () => dispatch(logout(() => history.push('/login')));

  return (
    <StyledWrapper ref={wrapperRef} isMobile={!!isMobile}>
      <Content ref={contentRef}>
        <SliderItem onClick={handleSliderItemClick}>
          <Text>Ustawienia</Text>
        </SliderItem>
        <SliderItem onClick={handleLogout}>
          <Text>Wyloguj</Text>
          <LogoutIcon />
        </SliderItem>
      </Content>
    </StyledWrapper>
  );
};

export default withRouter(HeaderSlider);
