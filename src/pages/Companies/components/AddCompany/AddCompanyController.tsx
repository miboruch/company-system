import React from 'react';

import PageContextProvider, { PageSettingEnum } from './context/PageContext';
import AddCompanyTemplate from './templates/AddCompanyTemplate/AddCompanyTemplate';
import AddCompanyHeader from './components/AddCompanyHeader/AddCompanyHeader';
import CompanyDataContextProvider from './context/CompanyDataContext';
import MainCompanyInfo from './pages/MainCompanyInfo/MainCompanyInfo';
import MapPage from './pages/MapPage/MapPage';
import AddressInfo from './pages/AddressInfo/AddressInfo';
import StepList from './components/StepList/StepList';
import { CloseButton } from 'components';
import { useModal } from 'components/hooks';

import { StandardCompoundTitle } from 'styles/compoundStyles';
import { MainWrapper, CloseButtonWrapper, Wrapper, ContentWrapper, CompoundTitle } from 'styles/compoundControllerStyles';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  setRefreshDate: (date: Date) => void;
}

const AddCompanyController: React.FC<Props> = ({ isOpen, handleClose, setRefreshDate }) => {
  const { wrapperRef, boxRef } = useModal(isOpen);

  return (
    <CompanyDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={wrapperRef}>
          <Wrapper ref={boxRef}>
            <CloseButtonWrapper>
              <CloseButton close={handleClose} />
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
                <AddressInfo handleClose={handleClose} setRefreshDate={setRefreshDate} />
              </AddCompanyTemplate>
            </ContentWrapper>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </CompanyDataContextProvider>
  );
};

export default AddCompanyController;
