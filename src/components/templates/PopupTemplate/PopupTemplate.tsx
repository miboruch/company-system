import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { modalOpenAnimation } from '../../../animations/animations';
import { Wrapper, Box, HeaderText, Header } from '../../../styles/popupStyles';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  headerText: string;
}

const PopupTemplate: React.FC<Props> = ({ isOpen, children, headerText }) => {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    modalOpenAnimation(tl, backgroundRef, boxRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <Wrapper ref={backgroundRef}>
      <Box ref={boxRef}>
        <Header>
          <HeaderText>{headerText}</HeaderText>
        </Header>
        {children}
      </Box>
    </Wrapper>
  );
};

export default PopupTemplate;
