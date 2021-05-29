import React from 'react';

import TaskDataContextProvider from './context/TaskDataContext';
import PageContextProvider from './context/PageContext';
import AddTaskHeader from './components/AddTaskHeader/AddTaskHeader';
import StepList from './components/StepList/StepList';
import AddTaskTemplate from './templates/AddTaskTemplate';
import TaskInfo from './components/TaskInfo/TaskInfo';
import SpecificInfo from './components/SpecificInfo/SpecificInfo';
import { CloseButton } from 'components';
import { useModal } from 'components/hooks';
import { PageSettingEnum } from './context/PageContext';

import { CloseButtonWrapper, CompoundTitle, ContentWrapper, MainWrapper, Wrapper } from 'styles/compoundControllerStyles';
import { StandardCompoundTitle } from 'styles/compoundStyles';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  setRefreshDate: (date: Date) => void;
}

const AddTaskController: React.FC<Props> = ({ isOpen, handleClose, setRefreshDate }) => {
  const { wrapperRef, boxRef } = useModal(isOpen);

  return (
    <TaskDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={wrapperRef}>
          <Wrapper ref={boxRef}>
            <CloseButtonWrapper>
              <CloseButton close={handleClose} />
            </CloseButtonWrapper>
            <AddTaskHeader />
            <CompoundTitle>Nowe zadanie</CompoundTitle>
            <StandardCompoundTitle>Uzupełnij informacje o zadaniu</StandardCompoundTitle>
            <StepList />
            <ContentWrapper>
              <AddTaskTemplate pageIndex={PageSettingEnum.First}>
                <TaskInfo />
              </AddTaskTemplate>
              <AddTaskTemplate pageIndex={PageSettingEnum.Second}>
                <SpecificInfo handleClose={handleClose} setRefreshDate={setRefreshDate} />
              </AddTaskTemplate>
            </ContentWrapper>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </TaskDataContextProvider>
  );
};

export default AddTaskController;
