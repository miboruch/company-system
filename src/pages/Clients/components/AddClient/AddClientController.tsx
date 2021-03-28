import React from 'react';

import ClientDataContextProvider from './context/ClientDataContext';
import PageContextProvider, { PageSettingEnum } from './context/PageContext';
import AddClientHeader from './components/AddClientHeader/AddClientHeader';
import AddClientTemplate from './templates/AddClientTemplate';
import StepList from './components/StepList/StepList';
import MainClientPage from './pages/MainClientPage/MainClientPage';
import MapPage from './pages/MapPage/MapPage';
import AddressPage from './pages/AddressPage/AddressPage';
import { CloseButton } from 'components';
import { useModal } from 'components/hooks';

import { CloseButtonWrapper, CompoundTitle, ContentWrapper, MainWrapper, Wrapper } from 'styles/compoundControllerStyles';
import { StandardCompoundTitle } from 'styles/compoundStyles';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  setRefreshDate: (date: Date) => void;
}

const AddClientController: React.FC<Props> = ({ isOpen, handleClose, setRefreshDate }) => {
  const { wrapperRef, boxRef } = useModal(isOpen);

  return (
    <ClientDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={wrapperRef}>
          <Wrapper ref={boxRef}>
            <CloseButtonWrapper>
              <CloseButton close={handleClose} />
            </CloseButtonWrapper>
            <AddClientHeader />
            <CompoundTitle>Dodaj klienta</CompoundTitle>
            <StandardCompoundTitle>Uzupełnij informacje o nowym kliencie</StandardCompoundTitle>
            <StepList />
            <ContentWrapper>
              <AddClientTemplate pageIndex={PageSettingEnum.First}>
                <MainClientPage />
              </AddClientTemplate>
              <AddClientTemplate pageIndex={PageSettingEnum.Second}>
                <MapPage />
              </AddClientTemplate>
              <AddClientTemplate pageIndex={PageSettingEnum.Third}>
                <AddressPage handleClose={handleClose} setRefreshDate={setRefreshDate} />
              </AddClientTemplate>
            </ContentWrapper>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </ClientDataContextProvider>
  );
};

export default AddClientController;
