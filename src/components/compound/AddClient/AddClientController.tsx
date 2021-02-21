import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector, useDispatch } from 'react-redux';

import ClientDataContextProvider from 'components/compound/AddClient/context/ClientDataContext';
import PageContextProvider, { PageSettingEnum } from 'components/compound/AddClient/context/PageContext';
import AddClientHeader from 'components/compound/AddClient/components/AddClientHeader/AddClientHeader';
import AddClientTemplate from 'components/compound/AddClient/templates/AddClientTemplate';
import StepList from 'components/compound/AddClient/components/StepList/StepList';
import MainClientPage from 'components/compound/AddClient/pages/MainClientPage/MainClientPage';
import MapPage from 'components/compound/AddClient/pages/MapPage/MapPage';
import AddressPage from 'components/compound/AddClient/pages/AddressPage/AddressPage';
import { CloseButton } from 'components';

import { AppState } from 'store/store';
import { modalOpenAnimation } from 'animations/animations';
import { setAddNewClientOpen } from 'ducks/client/client-toggle/client-toggle';
import { CloseButtonWrapper, CompoundTitle, ContentWrapper, MainWrapper, Wrapper } from 'styles/compoundControllerStyles';
import { StandardCompoundTitle } from 'styles/compoundStyles';

const AddClientController: React.FC = () => {
  const dispatch = useDispatch();
  const { isAddNewClientOpen } = useSelector((state: AppState) => state.client.clientToggle);

  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    modalOpenAnimation(tl, mainWrapperRef, wrapperRef);
  }, []);

  useEffect(() => {
    isAddNewClientOpen ? tl.play() : tl.reverse();
  }, [isAddNewClientOpen]);

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
                <AddressPage />
              </AddClientTemplate>
            </ContentWrapper>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </ClientDataContextProvider>
  );
};

export default AddClientController;
