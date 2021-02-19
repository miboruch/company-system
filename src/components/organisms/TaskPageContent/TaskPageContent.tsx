import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import GridWrapper from 'components/templates/GridWrapper/GridWrapper';
import Spinner from 'components/atoms/Spinner/Spinner';
import ListBox from 'components/molecules/ListBox/ListBox';
import ContentTemplate from 'components/templates/ContentTemplate/ContentTemplate';
import TaskInfo from 'components/organisms/TaskInfo/TaskInfo';
import DeletePopup from 'components/molecules/DeletePopup/DeletePopup';
import AddTaskController from 'components/compound/AddTask/AddTaskController';
import MapCoordsEdit, { CoordsEditType } from 'components/organisms/MapCoordsEdit/MapCoordsEdit';

import { TaskInterface } from 'types/modelsTypes';
import { AppState, useAppDispatch } from 'store/store';
import { selectTask } from 'ducks/tasks/tasks-toggle/tasks-toggle-creators';
import { setAddNewTaskOpen, setTaskInfoOpen, setTaskMapPreviewOpen } from 'ducks/tasks/tasks-toggle/tasks-toggle';
import { listAnimation } from 'animations/animations';
import { deleteTask, getCompanyTasks } from 'ducks/tasks/tasks-data/task-data-creators';
import { Paragraph } from 'styles/typography/typography';
import { SpinnerWrapper, List, AddIcon, AddWrapper } from 'styles/shared';
import { UserRole } from 'ducks/auth/roles/roles';

const TaskPageContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allCompanyTasks, areTasksLoading } = useSelector((state: AppState) => state.tasks.taskData);
  const { isTaskInfoOpen, isTaskMapPreviewOpen, selectedTask } = useSelector((state: AppState) => state.tasks.taskToggle);
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const filterByTaskName = (filterText: string, allTasks: TaskInterface[]): TaskInterface[] => {
    return allTasks.filter((task) => task.name.toLowerCase().includes(filterText.toLowerCase()));
  };

  const handleSelectTask = (task: TaskInterface) => () => dispatch(selectTask(task));
  const handleCloseTaskMapPreview = () => dispatch(setTaskMapPreviewOpen(false));
  const handleAddNewTaskOpen = () => dispatch(setAddNewTaskOpen(true));
  const handleTaskInfoClose = () => dispatch(setTaskInfoOpen(false));
  const handleDeleteTask = (id: string) => dispatch(deleteTask(id));

  useEffect(() => {
    listAnimation(tl, listRef, areTasksLoading);
  }, [areTasksLoading]);

  useEffect(() => {
    dispatch(getCompanyTasks());
  }, []);

  return (
    <>
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
              <List ref={listRef}>
                {filterByTaskName(filterText, allCompanyTasks).map((task) => (
                  <ListBox
                    key={task._id}
                    name={task.name}
                    topDescription={new Date(task.date).toLocaleDateString()}
                    bottomDescription={task.description}
                    isCompanyBox={false}
                    isChecked={task.isCompleted}
                    callback={handleSelectTask(task)}
                  />
                ))}
                {role === UserRole.Admin && (
                  <AddWrapper onClick={handleAddNewTaskOpen}>
                    <AddIcon />
                    <Paragraph type={'add'}>Dodaj zadanie</Paragraph>
                  </AddWrapper>
                )}
              </List>
              <ContentTemplate isOpen={isTaskInfoOpen} close={handleTaskInfoClose}>
                <TaskInfo isEditToggled={isEditToggled} setDeleteOpen={setDeleteOpen} setEditToggled={setEditToggled} />
              </ContentTemplate>
              <DeletePopup
                isOpen={isDeleteOpen}
                setOpen={setDeleteOpen}
                headerText={'Usuń zadanie'}
                text={`${selectedTask?.name}`}
                callback={() => selectedTask && handleDeleteTask(selectedTask._id)}
              />
              <AddTaskController />
            </>
          )
        }
      />
      {selectedTask?.clientId && (
        <MapCoordsEdit isOpen={isTaskMapPreviewOpen} closeMap={handleCloseTaskMapPreview} lat={selectedTask?.clientId.lat} long={selectedTask?.clientId.long} type={CoordsEditType.View} />
      )}
    </>
  );
};

export default TaskPageContent;
