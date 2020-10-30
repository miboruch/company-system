import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ClientDataContextProvider from './context/ClientDataContext';
import PageContextProvider, { PageSettingEnum } from './context/PageContext';
import gsap from 'gsap';
import { modalOpenAnimation } from '../../../animations/animations';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { setAddNewClientOpen } from '../../../actions/clientActions';
import { CloseButtonWrapper, CompoundTitle, ContentWrapper, MainWrapper, Wrapper } from '../../../styles/compoundControllerStyles';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import AddCompanyHeader from '../AddCompany/components/AddCompanyHeader/AddCompanyHeader';
import { StandardCompoundTitle } from '../../../styles/compoundStyles';
import AddClientTemplate from './templates/AddClientTemplate';
import StepList from './components/StepList/StepList';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const AddClientController: React.FC<ConnectedProps> = ({ isAddNewClientOpen, setAddNewClientOpen }) => {
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  // useOutsideClick(wrapperRef, isOpen, () => setOpen(false));

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
              <CloseButton setBoxState={() => setAddNewClientOpen(false)} />
            </CloseButtonWrapper>
            <AddCompanyHeader setBoxState={setAddNewClientOpen} />
            <CompoundTitle>Dodaj klienta</CompoundTitle>
            <StandardCompoundTitle>Uzupełnij informacje o nowym kliencie</StandardCompoundTitle>
            <StepList />
            <ContentWrapper>
              <AddClientTemplate pageIndex={PageSettingEnum.First}>
                <p>first</p>
              </AddClientTemplate>
              <AddClientTemplate pageIndex={PageSettingEnum.Second}>
                <p>second</p>
              </AddClientTemplate>
            </ContentWrapper>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </ClientDataContextProvider>
  );
};

interface LinkStateProps {
  isAddNewClientOpen: boolean;
}

interface LinkDispatchProps {
  setAddNewClientOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ clientReducer: { isAddNewClientOpen } }: AppState): LinkStateProps => {
  return { isAddNewClientOpen };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    setAddNewClientOpen: bindActionCreators(setAddNewClientOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddClientController);
