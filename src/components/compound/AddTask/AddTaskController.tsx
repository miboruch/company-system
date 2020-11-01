import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { connect } from 'react-redux';
import TaskDataContextProvider from './context/TaskDataContext';
import PageContextProvider from './context/PageContext';
import { CloseButtonWrapper, CompoundTitle, ContentWrapper, MainWrapper, Wrapper } from '../../../styles/compoundControllerStyles';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import AddTaskHeader from './components/AddTaskHeader/AddTaskHeader';
import { StandardCompoundTitle } from '../../../styles/compoundStyles';
import StepList from './components/StepList/StepList';
import AddTaskTemplate from './templates/AddTaskTemplate';
import { PageSettingEnum } from './context/PageContext';
import { modalOpenAnimation } from '../../../animations/animations';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { setAddNewTaskOpen } from '../../../actions/taskActions';
import TaskInfoPage from './pages/TaskInfoPage/TaskInfoPage';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const AddTaskController: React.FC<ConnectedProps> = ({ isAddNewTaskOpen, setAddNewTaskOpen }) => {
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    modalOpenAnimation(tl, mainWrapperRef, wrapperRef);
  }, []);

  useEffect(() => {
    isAddNewTaskOpen ? tl.play() : tl.reverse();
  }, [isAddNewTaskOpen]);

  return (
    <TaskDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={mainWrapperRef}>
          <Wrapper ref={wrapperRef}>
            <CloseButtonWrapper>
              <CloseButton setBoxState={() => setAddNewTaskOpen(false)} />
            </CloseButtonWrapper>
            <AddTaskHeader setBoxState={setAddNewTaskOpen} />
            <CompoundTitle>Dodaj zadanie</CompoundTitle>
            <StandardCompoundTitle>Uzupełnij informacje o zadaniu</StandardCompoundTitle>
            <StepList />
            <ContentWrapper>
              <AddTaskTemplate pageIndex={PageSettingEnum.First}>
                <TaskInfoPage />
              </AddTaskTemplate>
              <AddTaskTemplate pageIndex={PageSettingEnum.Second}>
                <p>Second</p>
              </AddTaskTemplate>
            </ContentWrapper>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </TaskDataContextProvider>
  );
};

interface LinkStateProps {
  isAddNewTaskOpen: boolean;
}

interface LinkDispatchProps {
  setAddNewTaskOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ taskReducer: { isAddNewTaskOpen } }: AppState): LinkStateProps => {
  return { isAddNewTaskOpen };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    setAddNewTaskOpen: bindActionCreators(setAddNewTaskOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskController);
