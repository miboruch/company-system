import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector, useDispatch } from 'react-redux';

import PageContextProvider, { PageSettingEnum } from 'components/compound/AddCompany/context/PageContext';
import AddCompanyTemplate from 'components/compound/AddCompany/templates/AddCompanyTemplate/AddCompanyTemplate';
import AddCompanyHeader from 'components/compound/AddCompany/components/AddCompanyHeader/AddCompanyHeader';
import CompanyDataContextProvider from 'components/compound/AddCompany/context/CompanyDataContext';
import MainCompanyInfo from 'components/compound/AddCompany/pages/MainCompanyInfo/MainCompanyInfo';
import MapPage from 'components/compound/AddCompany/pages/MapPage/MapPage';
import AddressInfo from 'components/compound/AddCompany/pages/AddressInfo/AddressInfo';
import StepList from 'components/compound/AddCompany/components/StepList/StepList';
import CloseButton from 'components/atoms/CloseButton/CloseButton';

import { AppState } from 'store/store';
import { setAddCompanyOpen } from 'ducks/company/company-toggle/company-toggle';
import { modalOpenAnimation } from 'animations/animations';
import { StandardCompoundTitle } from 'styles/compoundStyles';
import { MainWrapper, CloseButtonWrapper, Wrapper, ContentWrapper, CompoundTitle } from 'styles/compoundControllerStyles';

const AddCompanyController: React.FC = () => {
  const dispatch = useDispatch();
  const { isAddCompanyOpen } = useSelector((state: AppState) => state.company.companyToggle);
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    modalOpenAnimation(tl, mainWrapperRef, wrapperRef);
  }, []);

  useEffect(() => {
    isAddCompanyOpen ? tl.play() : tl.reverse();
  }, [isAddCompanyOpen]);

  const handleAddCompanyClose = () => dispatch(setAddCompanyOpen(false));

  return (
    <CompanyDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={mainWrapperRef}>
          <Wrapper ref={wrapperRef}>
            <CloseButtonWrapper>
              <CloseButton close={handleAddCompanyClose} />
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
