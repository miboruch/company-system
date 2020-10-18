import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import PageContextProvider, { PageSettingEnum } from './context/PageContext';
import AddCompanyTemplate from './templates/AddCompanyTemplate/AddCompanyTemplate';
import AddCompanyHeader from './components/AddCompanyHeader/AddCompanyHeader';
import CompanyDataContextProvider from './context/CompanyDataContext';
import MainCompanyInfo from './pages/MainCompanyInfo/MainCompanyInfo';
import MapPage from './pages/MapPage/MapPage';
import AddressInfo from './pages/AddressInfo/AddressInfo';
import CompoundStepBox from '../../molecules/CompoundStepBox/CompoundStepBox';
import { addCompanySteps } from './utils/AddCompanySteps';
import { StandardCompoundTitle } from '../../../styles/compoundStyles';
import StepList from './components/StepList/StepList';
import { useOutsideClick } from '../../../utils/customHooks';
import CloseButton from '../../atoms/CloseButton/CloseButton';

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  top: 0;
  left: 0;
  z-index: 1000;

  ${({ theme }) => theme.mq.hdReady} {
    background-color: ${({ theme }) => theme.colors.blurBackground};
    display: grid;
    place-items: center;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    //width: 90%;
    height: 80vh;
    position: relative;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 30px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 150px auto;
    grid-template-areas: 'title heading' 'list content';
  }

  ${({ theme }) => theme.mq.fullHd} {
    width: 80%;
  }
`;

const CompoundTitle = styled.h1`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 36px;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  letter-spacing: -1px;
  padding: 0 4rem;
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    display: block;
    grid-area: title;
    align-self: center;
    justify-self: center;
  }
`;

const CloseButtonWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    display: block;
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const AddCompanyController: React.FC<Props> = ({ isOpen, setOpen }) => {
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  // useOutsideClick(wrapperRef, isOpen, () => setOpen(false));

  useEffect(() => {
    const mainWrapper: HTMLDivElement | null = mainWrapperRef.current;
    const wrapper: HTMLDivElement | null = wrapperRef.current;

    if (mainWrapper && wrapper) {
      gsap.set([mainWrapper, wrapper, ...mainWrapper.children, ...wrapper.children], { autoAlpha: 0 });

      tl.fromTo(mainWrapper, { autoAlpha: 0, y: '+=30' }, { autoAlpha: 1, y: 0, duration: 0.1 })
        .fromTo(mainWrapper.children, { autoAlpha: 0, y: '+=20' }, { autoAlpha: 1, y: '0', duration: 0.2 })
        .fromTo(wrapper.children, { y: '+=10' }, { autoAlpha: 1, y: 0, stagger: 0.1 });
    }
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <CompanyDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={mainWrapperRef}>
          <Wrapper ref={wrapperRef}>
            <CloseButtonWrapper>
              <CloseButton setBoxState={() => setOpen(false)} />
            </CloseButtonWrapper>
            <AddCompanyHeader setBoxState={setOpen} />
            <CompoundTitle>Dodaj firme</CompoundTitle>
            <StandardCompoundTitle>Uzupełnij informacje o swojej firmie</StandardCompoundTitle>
            <StepList />
            <ContentWrapper>
              <AddCompanyTemplate pageIndex={PageSettingEnum.First}>
                <MainCompanyInfo />
              </AddCompanyTemplate>
              <AddCompanyTemplate pageIndex={PageSettingEnum.Second} withoutPadding={true}>
                <MapPage />
              </AddCompanyTemplate>
              <AddCompanyTemplate pageIndex={PageSettingEnum.Third}>
                <AddressInfo />
              </AddCompanyTemplate>
            </ContentWrapper>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </CompanyDataContextProvider>
  );
};

export default AddCompanyController;
