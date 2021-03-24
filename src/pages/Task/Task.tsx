import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import TaskList from './components/TaskList/TaskList';
import TaskInfo from './components/TaskInfo/TaskInfo';
import AddTaskController from './components/AddTask/AddTaskController';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';
import { GridWrapper, MenuTemplate, ContentTemplate, Spinner, DeletePopup } from 'components';
import { useCall, useQuery } from 'components/hooks';
import { setTaskMapPreviewOpen } from 'ducks/tasks/tasks-toggle/tasks-toggle';
import { AppState, useAppDispatch } from 'store/store';
import { setNotification } from 'ducks/popup/popup';
import { deleteTask } from 'api';

import { SpinnerWrapper } from 'styles';

const Task: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, resetQueries } = useQuery();
  const { isTaskMapPreviewOpen, selectedTask } = useSelector((state: AppState) => state.tasks.taskToggle);
  const [filterText, setFilterText] = useState<string>('');

  const { submit, onCallSuccess, onCallError } = useCall<typeof deleteTask>(deleteTask);
  onCallSuccess(resetQueries);
  onCallError(({ message }) => dispatch(setNotification({ message })));

  const handleCloseTaskMapPreview = () => dispatch(setTaskMapPreviewOpen(false));
  const handleDeleteTask = () => submit(query.task);

  return (
    <MenuTemplate>
      <GridWrapper
        mobilePadding={false}
        pageName={'Zadania'}
        setFilterText={setFilterText}
        render={(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) => (
          <>
            <TaskList filterText={filterText} />
            <ContentTemplate isOpen={!!query.task} close={resetQueries}>
              <TaskInfo isEditToggled={isEditToggled} setDeleteOpen={setDeleteOpen} setEditToggled={setEditToggled} />
            </ContentTemplate>
            <DeletePopup
              isOpen={isDeleteOpen}
              setOpen={setDeleteOpen}
              headerText={'Usuń zadanie'}
              text={`${selectedTask?.name}`}
              handleDelete={handleDeleteTask}
            />
            <AddTaskController />
          </>
        )}
      />
    </MenuTemplate>
  );
};

export default Task;
