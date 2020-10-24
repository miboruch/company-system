import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';
import { ContentWrapper, ArrowAbsoluteWrapper } from './ContentTemplate.styles';
import { Direction } from '../../../types/globalTypes';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

type ConnectedProps = Props;

const ContentTemplate: React.FC<ConnectedProps> = ({ children, isOpen, setOpen }) => {
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    const contentWrapper: HTMLDivElement | null = contentWrapperRef.current;

    if (contentWrapper) {
      gsap.set(contentWrapper, { x: '100%' });
      gsap.set([...contentWrapper.children], { autoAlpha: 0 });

      tl.fromTo(contentWrapper, { x: '100%' }, { x: 0, duration: 0.3 }).fromTo(contentWrapper.children, { y: '+=30' }, { autoAlpha: 1, y: 0, stagger: 0.4 });
    }
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <ContentWrapper ref={contentWrapperRef}>
      <ArrowAbsoluteWrapper>
        <ArrowButton onClick={() => setOpen(false)} direction={Direction.Left} />
      </ArrowAbsoluteWrapper>
      {children}
    </ContentWrapper>
  );
};

export default ContentTemplate;
