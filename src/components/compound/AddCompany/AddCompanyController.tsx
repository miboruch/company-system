import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import gsap from 'gsap';
import PageContextProvider, { PageSettingEnum } from './context/PageContext';
import AddCompanyTemplate from './templates/AddCompanyTemplate/AddCompanyTemplate';
import AddCompanyHeader from './components/AddCompanyHeader/AddCompanyHeader';
import CompanyDataContextProvider from './context/CompanyDataContext';
import MainCompanyInfo from './pages/MainCompanyInfo/MainCompanyInfo';
import MapPage from './pages/MapPage/MapPage';
import AddressInfo from './pages/AddressInfo/AddressInfo';
import { StandardCompoundTitle } from '../../../styles/compoundStyles';
import StepList from './components/StepList/StepList';
import { useOutsideClick } from '../../../utils/customHooks';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getUserAdminCompanies, setAddCompanyOpen } from '../../../actions/companyActions';
import { modalOpenAnimation } from '../../../animations/animations';

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;

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

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const AddCompanyController: React.FC<ConnectedProps> = ({ isAddCompanyOpen, setAddCompanyOpen }) => {
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  // useOutsideClick(wrapperRef, isOpen, () => setOpen(false));

  useEffect(() => {
    modalOpenAnimation(tl, mainWrapperRef, wrapperRef);
  }, []);

  useEffect(() => {
    isAddCompanyOpen ? tl.play() : tl.reverse();
  }, [isAddCompanyOpen]);

  return (
    <CompanyDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={mainWrapperRef}>
          <Wrapper ref={wrapperRef}>
            <CloseButtonWrapper>
              <CloseButton setBoxState={() => setAddCompanyOpen(false)} />
            </CloseButtonWrapper>
            <AddCompanyHeader setBoxState={setAddCompanyOpen} />
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

interface LinkStateProps {
  isAddCompanyOpen: boolean;
}

interface LinkDispatchProps {
  setAddCompanyOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ companyReducer: { isAddCompanyOpen } }: AppState): LinkStateProps => {
  return { isAddCompanyOpen };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    setAddCompanyOpen: bindActionCreators(setAddCompanyOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCompanyController);
