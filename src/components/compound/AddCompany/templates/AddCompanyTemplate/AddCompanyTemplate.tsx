import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { Wrapper } from './AddCompanyTemplate.styles';
import gsap from 'gsap';

interface Props {
  pageIndex: PageSettingEnum;
  children: React.ReactNode;
  withoutPadding?: boolean;
}

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const AddCompanyTemplate: React.FC<Props> = ({ pageIndex, children, withoutPadding }) => {
  const { currentPage } = useContext(PageContext);

  // const wrapperRef = useRef<HTMLDivElement | null>(null);
  // const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));
  //
  // useEffect(() => {
  //   const wrapper: HTMLDivElement | null = wrapperRef.current;
  //
  //   if (wrapper) {
  //     gsap.set([wrapper], { autoAlpha: 0 });
  //
  //     tl.to(wrapper, { autoAlpha: 1, duration: 0.2 });
  //   }
  // }, []);
  //
  // useEffect(() => {
  //   currentPage === pageIndex && tl.play();
  // }, [currentPage, pageIndex]);

  // return <Wrapper ref={wrapperRef}>{children}</Wrapper>;
  // return <ContentWrapper>{children}</ContentWrapper>;
  return <>{currentPage === pageIndex && children}</>;
  // return <>{currentPage === pageIndex && <Wrapper withoutPadding={!!withoutPadding}>{children}</Wrapper>}</>;
};

export default AddCompanyTemplate;
