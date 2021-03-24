import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';

import { Button, FormField, MenuTemplate, Spinner } from 'components';
import { AppState, useAppDispatch } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { setTaskMapPreviewOpen } from 'ducks/tasks/tasks-toggle/tasks-toggle';
import { changeTaskState } from 'ducks/tasks/tasks-data/task-data-creators';
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
import { SpinnerWrapper } from 'styles';
import { CheckedIcon, DeleteIcon, EditIcon, LocationIcon, NotCheckedIcon } from 'styles/iconStyles';
import { useQuery, useFetch, useShowContent, useSubmit } from 'components/hooks';
import { fetchTask, putTask, TaskValues } from 'api';
import { setNotification } from 'ducks/popup/popup';
import { prepareValues } from './task-info.values';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';
import TaskHeader from 'pages/Task/components/TaskInfo/components/TaskHeader/TaskHeader';

interface ParagraphInterface {
  isCompleted: boolean;
}

const ColoredParagraph = styled(Paragraph)<ParagraphInterface>`
  color: ${({ theme, isCompleted }) => (isCompleted ? theme.colors.red : theme.colors.green)};
  cursor: pointer;
`;

interface Props {
  isEditToggled: boolean;
  setEditToggled: (toBeOpen: boolean) => void;
  setDeleteOpen: (toBeOpen: boolean) => void;
}

const TaskInfo: React.FC<Props> = ({ isEditToggled, setEditToggled, setDeleteOpen }) => {
  const dispatch = useAppDispatch();
  const { query } = useQuery();
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { selectedTask, isTaskMapPreviewOpen } = useSelector((state: AppState) => state.tasks.taskToggle);

  const handleCloseTaskMapPreview = () => dispatch(setTaskMapPreviewOpen(false));

  const taskData = useFetch<typeof fetchTask>(fetchTask(query.task), { dependencies: [query.task], conditions: !!query.task });
  const { showContent, showNoContent, showLoader, showError } = useShowContent(taskData);
  const { payload: task, refresh } = taskData;

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit<typeof putTask, TaskValues>(putTask(query.task));
  onSubmitSuccess(async () => {
    dispatch(setNotification({ message: 'Zaktualizowano', notificationType: 'success' }));
    await refresh();
  });
  onSubmitError(({ message }) => dispatch(setNotification({ message })));

  const initialValues = prepareValues(task);

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

  //TODO: new smaller componetns - useFormikContext

  return (
    <Wrapper>
      {showLoader && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      {showNoContent && <Paragraph>Brak danych</Paragraph>}
      {showError && <Paragraph>Problem z załadowaniem danych</Paragraph>}
      {showContent && task && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ isSubmitting, values }) => (
            <StyledForm>
              <TaskHeader task={task} handleEditToggle={handleEditToggle} handleDeleteOpen={handleDeleteOpen} />
              <EmployeeInfoBox>
                <Paragraph type={'subparagraph'}>
                  Data zadania do wykonania: {new Date(values.date).toLocaleDateString()}
                </Paragraph>
                <Paragraph type={'subparagraph'}>{values.description}</Paragraph>
                {role === UserRole.Admin && (
                  <ColoredParagraph isCompleted={values.isCompleted || false} onClick={handleTaskStateChange}>
                    Oznacz jako {values.isCompleted ? 'niewykonane' : 'wykonane'}
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
                  <FormField key={field.name} {...field} spacing={true} />
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
          {task.clientId && (
            <MapCoordsEdit
              isOpen={isTaskMapPreviewOpen}
              closeMap={handleCloseTaskMapPreview}
              lat={task.clientId.lat}
              long={task.clientId.long}
              type={CoordsEditType.View}
            />
          )}
        </Formik>
      )}
    </Wrapper>
  );
};

export default TaskInfo;
