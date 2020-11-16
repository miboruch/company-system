import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import PageContextProvider, { PageSettingEnum } from './context/PageContext';
import AddCompanyTemplate from './templates/AddCompanyTemplate/AddCompanyTemplate';
import AddCompanyHeader from './components/AddCompanyHeader/AddCompanyHeader';
import CompanyDataContextProvider from './context/CompanyDataContext';
import MainCompanyInfo from './pages/MainCompanyInfo/MainCompanyInfo';
import MapPage from './pages/MapPage/MapPage';
import AddressInfo from './pages/AddressInfo/AddressInfo';
import { StandardCompoundTitle } from '../../../styles/compoundStyles';
import StepList from './components/StepList/StepList';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import { AppState } from '../../../reducers/rootReducer';
import { setAddCompanyOpen } from '../../../actions/companyActions';
import { modalOpenAnimation } from '../../../animations/animations';
import { MainWrapper, CloseButtonWrapper, Wrapper, ContentWrapper, CompoundTitle } from '../../../styles/compoundControllerStyles';

const AddCompanyController: React.FC = () => {
  const dispatch = useDispatch();
  const { isAddCompanyOpen } = useSelector(({ companyReducer }: AppState) => companyReducer);
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
              <CloseButton setBoxState={() => dispatch(setAddCompanyOpen(false))} />
            </CloseButtonWrapper>
            <AddCompanyHeader />
            <CompoundTitle>Dodaj firme</CompoundTitle>
            <StandardCompoundTitle>Uzupełnij informacje o swojej firmie</StandardCompoundTitle>
            <StepList />
            <ContentWrapper>
              <AddCompanyTemplate pageIndex={PageSettingEnum.First}>
                <MainCompanyInfo />
              </AddCompanyTemplate>
              <AddCompanyTemplate pageIndex={PageSettingEnum.Second}>
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
