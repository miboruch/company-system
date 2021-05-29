import React, { useState } from 'react';

import TaskList from './components/TaskList/TaskList';
import TaskInfo from './components/TaskInfo/TaskInfo';
import AddTaskController from './components/AddTask/AddTaskController';
import { GridWrapper, MenuTemplate, ContentTemplate, DeletePopup, notifications } from 'components';
import { useCall, useQuery } from 'components/hooks';
import { deleteTask } from 'api';

const Task: React.FC = () => {
  const { query, resetQueries } = useQuery();
  const [filterText, setFilterText] = useState<string>('');
  const [refreshDate, setRefreshDate] = useState<Date>(new Date());
  const [isAddTaskOpen, setAddTaskOpen] = useState<boolean>(false);

  const { submit, onCallSuccess, onCallError } = useCall<typeof deleteTask>(deleteTask);
  onCallSuccess(() => {
    resetQueries();
    setRefreshDate(new Date());
  });
  onCallError(({ message }) => notifications.error(message));

  const handleDeleteTask = () => submit(query.task);

  const handleAddTaskOpen = (isOpen: boolean) => () => setAddTaskOpen(isOpen);

  return (
    <MenuTemplate>
      <GridWrapper
        mobilePadding={false}
        pageName={'Zadania'}
        setFilterText={setFilterText}
        render={(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) => (
          <>
            <TaskList filterText={filterText} refreshDate={refreshDate} handleAddTaskOpen={handleAddTaskOpen(true)} />
            <ContentTemplate isOpen={!!query.task} close={resetQueries}>
              <TaskInfo isEditToggled={isEditToggled} setDeleteOpen={setDeleteOpen} setEditToggled={setEditToggled} />
            </ContentTemplate>
            <DeletePopup
              isOpen={isDeleteOpen}
              setOpen={setDeleteOpen}
              headerText={'Usuń zadanie'}
              text={`zadanie`}
              handleDelete={handleDeleteTask}
            />
            <AddTaskController isOpen={isAddTaskOpen} handleClose={handleAddTaskOpen(false)} setRefreshDate={setRefreshDate} />
          </>
        )}
      />
    </MenuTemplate>
  );
};

export default Task;
