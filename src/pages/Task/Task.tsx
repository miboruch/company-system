import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import TaskList from './components/TaskList/TaskList';
import TaskInfo from './components/TaskInfo/TaskInfo';
import AddTaskController from './components/AddTask/AddTaskController';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';
import { GridWrapper, MenuTemplate, ContentTemplate, Spinner, DeletePopup } from 'components';
import { useQuery } from 'components/hooks';
import { setTaskMapPreviewOpen } from 'ducks/tasks/tasks-toggle/tasks-toggle';
import { AppState, useAppDispatch } from 'store/store';
import { deleteTask } from 'ducks/tasks/tasks-data/task-data-creators';

import { SpinnerWrapper } from 'styles';

const Task: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, resetQueries } = useQuery();
  const { areTasksLoading } = useSelector((state: AppState) => state.tasks.taskData);
  const { isTaskMapPreviewOpen, selectedTask } = useSelector((state: AppState) => state.tasks.taskToggle);
  const [filterText, setFilterText] = useState<string>('');

  const handleCloseTaskMapPreview = () => dispatch(setTaskMapPreviewOpen(false));
  const handleDeleteTask = (id: string) => dispatch(deleteTask(id));

  const handleTaskInfoClose = () => resetQueries();

  return (
    <MenuTemplate>
      <GridWrapper
        mobilePadding={false}
        pageName={'Zadania'}
        setFilterText={setFilterText}
        render={(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) =>
          areTasksLoading ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : (
            <>
              <TaskList filterText={filterText} />
              <ContentTemplate isOpen={!!query.task} close={handleTaskInfoClose}>
                <TaskInfo isEditToggled={isEditToggled} setDeleteOpen={setDeleteOpen} setEditToggled={setEditToggled} />
              </ContentTemplate>
              <DeletePopup
                isOpen={isDeleteOpen}
                setOpen={setDeleteOpen}
                headerText={'Usuń zadanie'}
                text={`${selectedTask?.name}`}
                handleDelete={() => selectedTask && handleDeleteTask(selectedTask._id)}
              />
              <AddTaskController />
            </>
          )
        }
      />
      {selectedTask?.clientId && (
        <MapCoordsEdit
          isOpen={isTaskMapPreviewOpen}
          closeMap={handleCloseTaskMapPreview}
          lat={selectedTask?.clientId.lat}
          long={selectedTask?.clientId.long}
          type={CoordsEditType.View}
        />
      )}
    </MenuTemplate>
  );
};

export default Task;
