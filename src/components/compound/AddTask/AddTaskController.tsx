import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';

import TaskDataContextProvider from './context/TaskDataContext';
import PageContextProvider from './context/PageContext';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import AddTaskHeader from './components/AddTaskHeader/AddTaskHeader';
import StepList from './components/StepList/StepList';
import AddTaskTemplate from './templates/AddTaskTemplate';
import TaskInfoPage from './pages/TaskInfoPage/TaskInfoPage';
import SpecificInfoPage from './pages/SpecificInfoPage/SpecificInfoPage';

import { AppState } from '../../../store/store';
import { PageSettingEnum } from './context/PageContext';
import { modalOpenAnimation } from '../../../animations/animations';
import { setAddNewTaskOpen } from '../../../ducks/tasks/tasks-toggle/tasks-toggle';
import { CloseButtonWrapper, CompoundTitle, ContentWrapper, MainWrapper, Wrapper } from '../../../styles/compoundControllerStyles';
import { StandardCompoundTitle } from '../../../styles/compoundStyles';

const AddTaskController: React.FC = () => {
  const dispatch = useDispatch();
  const { isAddNewTaskOpen } = useSelector((state: AppState) => state.tasks.taskToggle);

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
              <CloseButton close={() => dispatch(setAddNewTaskOpen(false))} />
            </CloseButtonWrapper>
            <AddTaskHeader />
            <CompoundTitle>Nowe zadanie</CompoundTitle>
            <StandardCompoundTitle>Uzupełnij informacje o zadaniu</StandardCompoundTitle>
            <StepList />
            <ContentWrapper>
              <AddTaskTemplate pageIndex={PageSettingEnum.First}>
                <TaskInfoPage />
              </AddTaskTemplate>
              <AddTaskTemplate pageIndex={PageSettingEnum.Second}>
                <SpecificInfoPage />
              </AddTaskTemplate>
            </ContentWrapper>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </TaskDataContextProvider>
  );
};

export default AddTaskController;
