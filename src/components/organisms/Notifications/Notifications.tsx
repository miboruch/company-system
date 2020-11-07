import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import gsap from 'gsap';
import { useOutsideClick } from '../../../utils/customHooks';
import NotificationBox from '../../molecules/NotificationBox/NotificationBox';
import { StyledWrapper, Header, Content } from './Notifications.styles';
import { notificationsAnimation } from '../../../animations/animations';
import { NotificationInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ConnectedProps = Props & LinkStateProps;

const Notifications: React.FC<ConnectedProps> = ({ isOpen, setOpen, notifications }) => {
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
      <Header>
        <h4>Powiadomienia</h4>
      </Header>
      <Content ref={contentRef}>
        <NotificationBox title={'test'} description={'test again'} createdDate={new Date()} wasOpened={false} />
        <NotificationBox title={'test'} description={'test again'} createdDate={new Date()} wasOpened={true} />
        <NotificationBox title={'test'} description={'test again'} createdDate={new Date()} wasOpened={true} />
      </Content>
    </StyledWrapper>
  );
};

interface LinkStateProps {
  notifications: NotificationInterface[];
}

const mapStateToProps = ({ notificationReducer: { notifications } }: AppState): LinkStateProps => {
  return { notifications };
};

export default connect(mapStateToProps)(Notifications);
