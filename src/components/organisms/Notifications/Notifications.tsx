import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import NotificationBox from '../../molecules/NotificationBox/NotificationBox';
import Spinner from '../../atoms/Spinner/Spinner';

import { AppState } from '../../../store/store';
import { useOutsideClick } from '../../../utils/customHooks';
import { notificationsAnimation } from '../../../animations/animations';
import { StyledWrapper, Header, Content } from './Notifications.styles';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Notifications: React.FC<Props> = ({ isOpen, setOpen }) => {
  const { areNotificationsLoading, notifications } = useSelector((state: AppState) => state.notifications);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useOutsideClick(wrapperRef, isOpen, () => setOpen(false));

  useEffect(() => {
    notificationsAnimation(tl, wrapperRef, contentRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <StyledWrapper ref={wrapperRef}>
      {areNotificationsLoading ? (
        <Spinner />
      ) : (
        <>
          <Header>
            <h4>Powiadomienia</h4>
          </Header>
          <Content ref={contentRef}>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <NotificationBox key={index} title={notification.title} description={notification.description} createdDate={new Date(notification.createdDate)} wasOpened={notification.wasOpened} />
              ))
            ) : (
              <p>Brak powiadomień</p>
            )}
          </Content>
        </>
      )}
    </StyledWrapper>
  );
};

export default Notifications;
