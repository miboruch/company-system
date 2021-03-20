import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';

import { Button, FormField } from 'components';
import { AppState, useAppDispatch } from 'store/store';
import { ClientInterface } from 'types/modelsTypes';
import { UserRole } from 'ducks/auth/roles/roles';
import { setTaskMapPreviewOpen } from 'ducks/tasks/tasks-toggle/tasks-toggle';
import { changeTaskState, editTask } from 'ducks/tasks/tasks-data/task-data-creators';
import { taskInfoFields } from './task-info.fields';

import { Paragraph } from 'styles/typography/typography';
import {
  ButtonWrapper,
  EmployeeInfoBox,
  HeaderWrapper,
  InputWrapper,
  RowIconWrapper,
  StyledForm,
  Title,
  Wrapper
} from 'styles/contentStyles';
import { CheckedIcon, DeleteIcon, EditIcon, LocationIcon, NotCheckedIcon } from 'styles/iconStyles';
import { useQuery, useFetch, useShowContent, useSubmit } from 'components/hooks';
import { fetchTask } from 'api';

interface ParagraphInterface {
  isCompleted: boolean;
}

const ColoredParagraph = styled(Paragraph)<ParagraphInterface>`
  color: ${({ theme, isCompleted }) => (isCompleted ? theme.colors.red : theme.colors.green)};
  cursor: pointer;
`;

interface InitialValues {
  name: string;
  description: string;
  timeEstimate: number;
  clientId?: ClientInterface | null;
  taskIncome: number;
  taskExpense: number;
  isCompleted: boolean;
  date: Date;
}

interface Props {
  isEditToggled: boolean;
  setEditToggled: (toBeOpen: boolean) => void;
  setDeleteOpen: (toBeOpen: boolean) => void;
}

const TaskInfo: React.FC<Props> = ({ isEditToggled, setEditToggled, setDeleteOpen }) => {
  const dispatch = useAppDispatch();
  const {query} = useQuery();
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { selectedTask } = useSelector((state: AppState) => state.tasks.taskToggle);

  const taskData = useFetch<typeof fetchTask>(fetchTask(query.task), {dependencies: [query.task]})
  const {showContent, showNoContent, showLoader, showError}= useShowContent(taskData);
  const {payload: task} = taskData;

  const initialValues: InitialValues = {
    name: task?.name || '',
    description: task?.description || '',
    timeEstimate: task?.timeEstimate || 0,
    clientId: task?.clientId,
    taskIncome: task?.taskIncome ? task.taskIncome : 0,
    taskExpense: task?.taskExpense ? task.taskExpense : 0,
    isCompleted: task?.isCompleted || false,
    date: task?.date || new Date()
  };

  const handleSubmit = ({ date, name, description, timeEstimate, taskIncome, taskExpense }: InitialValues) => {
    if (selectedTask) {
      const { _id } = selectedTask;
      dispatch(
        editTask({
          taskId: _id,
          date,
          name,
          description,
          timeEstimate,
          taskIncome: taskIncome ? taskIncome : 0,
          taskExpense: taskExpense ? taskExpense : 0
        })
      );
    }
  };

  const handleTaskMapPreview = () => dispatch(setTaskMapPreviewOpen(true));
  const handleEditToggle = () => setEditToggled(!isEditToggled);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleTaskStateChange = () => {
    if (selectedTask) {
      dispatch(
        changeTaskState({
          taskId: selectedTask?._id,
          isCompleted: !selectedTask?.isCompleted
        })
      );
    }
  };

  return (
    <Wrapper>
      {!!selectedTask && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <Paragraph>Data dodania: {new Date(selectedTask.addedDate).toLocaleDateString()}</Paragraph>
              <HeaderWrapper>
                <Title>{selectedTask.name}</Title>
                <RowIconWrapper>
                  {selectedTask?.isCompleted ? <CheckedIcon /> : <NotCheckedIcon />}
                  {selectedTask.clientId && <LocationIcon onClick={handleTaskMapPreview} />}
                  {role === UserRole.Admin && (
                    <>
                      <EditIcon onClick={handleEditToggle} />
                      <DeleteIcon onClick={handleDeleteOpen} />
                    </>
                  )}
                </RowIconWrapper>
              </HeaderWrapper>
              <EmployeeInfoBox>
                <Paragraph type={'subparagraph'}>
                  Data zadania do wykonania: {new Date(selectedTask.date).toLocaleDateString()}
                </Paragraph>
                <Paragraph type={'subparagraph'}>{selectedTask.description}</Paragraph>
                {role === UserRole.Admin && (
                  <ColoredParagraph isCompleted={selectedTask?.isCompleted} onClick={handleTaskStateChange}>
                    Oznacz jako {selectedTask?.isCompleted ? 'niewykonane' : 'wykonane'}
                  </ColoredParagraph>
                )}
              </EmployeeInfoBox>
              <InputWrapper>
                <FormField name={'date'} type={'date'} label={'Data wykonania zadania'} required={true} />
              </InputWrapper>
              <Paragraph type={'text'}>
                Jeżeli chcesz edytować zadanie, naciśnij przycisk edycji obok nazwy zadania. Pozwoli to na odblokwanie wszystkich
                pól oraz edycję danych.
              </Paragraph>
              <InputWrapper>
                {taskInfoFields.map((field) => (
                  <FormField key={field.name} {...field} />
                ))}
              </InputWrapper>
              {role === UserRole.Admin && (
                <ButtonWrapper>
                  <Button type={'submit'} disabled={isSubmitting}>
                    Zapisz
                  </Button>
                </ButtonWrapper>
              )}
            </StyledForm>
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

export default TaskInfo;
