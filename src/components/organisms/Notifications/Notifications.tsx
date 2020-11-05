import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import gsap from 'gsap';
import { useOutsideClick } from '../../../utils/customHooks';
import NotificationBox from '../../molecules/NotificationBox/NotificationBox';

const StyledWrapper = styled.div`
  width: 90%;
  height: 80vh;
  border: 1px solid #ccc;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 4rem;
  right: 0;
  z-index: 1001;

  ${({ theme }) => theme.mq.hdReady} {
    width: 400px;
    height: 500px;
  }
`;

const Header = styled.header`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #f7f8fc;
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  overflow-y: scroll;
`;

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Notifications: React.FC<Props> = ({ isOpen, setOpen }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useOutsideClick(wrapperRef, isOpen, () => setOpen(false));

  useEffect(() => {
    const wrapper: HTMLDivElement | null = wrapperRef.current;

    if (wrapper) {
      gsap.set([wrapper, ...wrapper.children], { autoAlpha: 0 });

      tl.fromTo(wrapper, { autoAlpha: 0, y: '-=40' }, { autoAlpha: 1, y: '0', duration: 0.4 }).fromTo(wrapper.children, { y: '+=20' }, { autoAlpha: 1, y: 0, stagger: 0.1 });
    }
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
        <NotificationBox title={'test'} description={'test again'} wasOpened={true} />
        <NotificationBox title={'test'} description={'test again'} wasOpened={true} />
        <NotificationBox title={'test'} description={'test again'} wasOpened={true} />
      </Content>
    </StyledWrapper>
  );
};

export default Notifications;
