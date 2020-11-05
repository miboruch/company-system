import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useOutsideClick } from '../../../utils/customHooks';
import NotificationBox from '../../molecules/NotificationBox/NotificationBox';
import { StyledWrapper, Header, Content } from './Notifications.styles';
import { notificationsAnimation } from '../../../animations/animations';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Notifications: React.FC<Props> = ({ isOpen, setOpen }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useOutsideClick(wrapperRef, isOpen, () => setOpen(false));

  useEffect(() => {
    notificationsAnimation(tl, wrapperRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <StyledWrapper ref={wrapperRef}>
      <Header>
        <h4>Powiadomienia</h4>
      </Header>
      <Content>
        <NotificationBox title={'test'} description={'test again'} wasOpened={false} />
        <NotificationBox title={'test'} description={'test again'} wasOpened={true} />
        <NotificationBox title={'test'} description={'test again'} wasOpened={true} />
      </Content>
    </StyledWrapper>
  );
};

export default Notifications;
