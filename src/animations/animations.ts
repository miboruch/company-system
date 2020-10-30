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
