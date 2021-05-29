import React from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';

import TaskHeader from './components/TaskHeader/TaskHeader';
import TaskMainInfo from './components/TaskMainInfo/TaskMainInfo';
import TaskFields from './components/TaskFields/TaskFields';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';
import { useQuery, useFetch, useShowContent, useSubmit } from 'components/hooks';
import { Spinner, notifications } from 'components';
import { fetchTask, putTask } from 'api';
import { prepareValues } from './task-info.values';
import { setTaskMapPreviewOpen } from 'ducks/tasks/tasks-toggle/tasks-toggle';
import { AppState, useAppDispatch } from 'store/store';

import { StyledForm, Wrapper } from 'styles/contentStyles';
import { SpinnerWrapper, Paragraph } from 'styles';

interface Props {
  isEditToggled: boolean;
  setEditToggled: (toBeOpen: boolean) => void;
  setDeleteOpen: (toBeOpen: boolean) => void;
}

const TaskInfo: React.FC<Props> = ({ isEditToggled, setEditToggled, setDeleteOpen }) => {
  const dispatch = useAppDispatch();
  const { query } = useQuery();
  const { isTaskMapPreviewOpen } = useSelector((state: AppState) => state.tasks.taskToggle);

  const taskData = useFetch(fetchTask(query.task), { dependencies: [query.task], conditions: !!query.task });
  const { showContent, showNoContent, showLoader, showError } = useShowContent(taskData);
  const { payload: task, refresh } = taskData;

  const { onSubmit, onSubmitSuccess, onSubmitError } = useSubmit(putTask(query.task));
  onSubmitSuccess(async () => {
    notifications.success('Zaktualizowano');
    await refresh();
  });
  onSubmitError(({ message }) => notifications.error(message));

  const initialValues = prepareValues(task);

  const handleCloseTaskMapPreview = () => dispatch(setTaskMapPreviewOpen(false));
  const handleEditToggle = () => setEditToggled(!isEditToggled);
  const handleDeleteOpen = () => setDeleteOpen(true);

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
          <StyledForm>
            <TaskHeader task={task} handleEditToggle={handleEditToggle} handleDeleteOpen={handleDeleteOpen} />
            <TaskMainInfo refresh={refresh} />
            <TaskFields />
            {task.clientId && (
              <MapCoordsEdit
                isOpen={isTaskMapPreviewOpen}
                closeMap={handleCloseTaskMapPreview}
                lat={task.clientId.lat}
                long={task.clientId.long}
                type={CoordsEditType.View}
              />
            )}
          </StyledForm>
        </Formik>
      )}
    </Wrapper>
  );
};

export default TaskInfo;
