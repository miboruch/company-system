import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useDispatch } from 'react-redux';

import ClientDataContextProvider from './context/ClientDataContext';
import PageContextProvider, { PageSettingEnum } from './context/PageContext';
import AddClientHeader from './components/AddClientHeader/AddClientHeader';
import AddClientTemplate from './templates/AddClientTemplate';
import StepList from './components/StepList/StepList';
import MainClientPage from './pages/MainClientPage/MainClientPage';
import MapPage from './pages/MapPage/MapPage';
import AddressPage from './pages/AddressPage/AddressPage';
import { CloseButton } from 'components';
import { modalOpenAnimation } from 'animations/animations';
import { setAddNewClientOpen } from 'ducks/client/client-toggle/client-toggle';

import { CloseButtonWrapper, CompoundTitle, ContentWrapper, MainWrapper, Wrapper } from 'styles/compoundControllerStyles';
import { StandardCompoundTitle } from 'styles/compoundStyles';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  setRefreshDate: (date: Date) => void;
}

const AddClientController: React.FC<Props> = ({ isOpen, handleClose, setRefreshDate }) => {
  const dispatch = useDispatch();

  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    modalOpenAnimation(tl, mainWrapperRef, wrapperRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  const handleAddClientClose = () => dispatch(setAddNewClientOpen(false));

  return (
    <ClientDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={mainWrapperRef}>
          <Wrapper ref={wrapperRef}>
            <CloseButtonWrapper>
              <CloseButton close={handleAddClientClose} />
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
