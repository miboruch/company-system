import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import ClientDataContextProvider from './context/ClientDataContext';
import PageContextProvider, { PageSettingEnum } from './context/PageContext';
import { modalOpenAnimation } from '../../../animations/animations';
import { AppState } from '../../../store/test-store';
import { setAddNewClientOpen } from '../../../ducks/client/client-toggle/client-toggle';
import { CloseButtonWrapper, CompoundTitle, ContentWrapper, MainWrapper, Wrapper } from '../../../styles/compoundControllerStyles';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import AddClientHeader from './components/AddClientHeader/AddClientHeader';
import { StandardCompoundTitle } from '../../../styles/compoundStyles';
import AddClientTemplate from './templates/AddClientTemplate';
import StepList from './components/StepList/StepList';
import MainClientPage from './pages/MainClientPage/MainClientPage';
import MapPage from './pages/MapPage/MapPage';
import AddressPage from './pages/AddressPage/AddressPage';

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

  return (
    <ClientDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={mainWrapperRef}>
          <Wrapper ref={wrapperRef}>
            <CloseButtonWrapper>
              <CloseButton close={() => dispatch(setAddNewClientOpen(false))} />
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
