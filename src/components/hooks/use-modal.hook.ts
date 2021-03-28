import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { modalOpenAnimation } from 'animations/animations';

type UseModalReturn = {
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
  boxRef: React.MutableRefObject<HTMLDivElement | null>;
};

const useModal = (isOpen: boolean): UseModalReturn => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    modalOpenAnimation(tl, wrapperRef, boxRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return { wrapperRef, boxRef };
};

export default useModal;
