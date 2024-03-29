import React from 'react';
import gsap from 'gsap';

export const listAnimation = (tl: GSAPTimeline, listRef: React.RefObject<HTMLDivElement | null>, isLoading?: boolean) => {
  const list: HTMLDivElement | null = listRef.current;

  if (list && !isLoading) {
    gsap.set([...list.children], { autoAlpha: 0 });

    tl.fromTo(list.children, { autoAlpha: 0, y: '+=30' }, { autoAlpha: 1, y: 0, stagger: 0.2 });
  }
};

export const contentAnimation = (tl: GSAPTimeline, contentRef: React.RefObject<HTMLDivElement | null>) => {
  const content: HTMLDivElement | null = contentRef.current;

  if (content) {
    gsap.set([...content.children], { autoAlpha: 0 });

    tl.fromTo(content.children, { autoAlpha: 0, y: '+=30' }, { autoAlpha: 1, y: 0, stagger: 0.2 });
  }
};

export const modalOpenAnimation = (
  tl: GSAPTimeline,
  mainWrapperRef: React.MutableRefObject<HTMLDivElement | null>,
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const mainWrapper: HTMLDivElement | null = mainWrapperRef.current;
  const wrapper: HTMLDivElement | null = wrapperRef.current;

  if (mainWrapper && wrapper) {
    gsap.set([mainWrapper, wrapper, ...mainWrapper.children, ...wrapper.children], { autoAlpha: 0 });

    tl.fromTo(mainWrapper, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18 })
      .fromTo(mainWrapper.children, { autoAlpha: 0, y: '+=20' }, { autoAlpha: 1, y: '0', duration: 0.2 })
      .fromTo(wrapper.children, { y: '+=10', autoAlpha: 0 }, { autoAlpha: 1, y: 0, stagger: 0.1 });
  }
};

export const notificationsAnimation = (
  tl: GSAPTimeline,
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  contentRef: React.RefObject<HTMLDivElement | null>
) => {
  const wrapper: HTMLDivElement | null = wrapperRef.current;
  const content: HTMLDivElement | null = contentRef.current;

  if (wrapper && content) {
    gsap.set([wrapper, ...wrapper.children], { autoAlpha: 0 });

    tl.fromTo(wrapper, { autoAlpha: 0, y: '-=40' }, { autoAlpha: 1, y: '0', duration: 0.4 }).fromTo(
      wrapper.children,
      { y: '+=20' },
      { autoAlpha: 1, y: 0, stagger: 0.1 }
    );
  }
};
