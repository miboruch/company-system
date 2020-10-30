import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import ClientDataContextProvider from './context/ClientDataContext';
import PageContextProvider from './context/PageContext';
import gsap from 'gsap';
import { modalOpenAnimation } from '../../../animations/animations';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { setAddNewClientOpen } from '../../../actions/clientActions';
import { MainWrapper, Wrapper, CompoundTitle, ContentWrapper, CloseButtonWrapper } from '../../../styles/compoundControllerStyles';

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
            <p>Test</p>
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
