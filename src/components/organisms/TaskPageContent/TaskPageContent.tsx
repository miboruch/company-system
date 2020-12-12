import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import Spinner from '../../atoms/Spinner/Spinner';
import ListBox from '../../molecules/ListBox/ListBox';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';
import TaskInfo from '../TaskInfo/TaskInfo';
import DeletePopup from '../../molecules/DeletePopup/DeletePopup';
import AddTaskController from '../../compound/AddTask/AddTaskController';
import MapCoordsEdit, { CoordsEditType } from '../MapCoordsEdit/MapCoordsEdit';

import { TaskInterface } from '../../../types/modelsTypes';
import { AppState, useAppDispatch } from '../../../store/store';
import { selectTask } from '../../../ducks/tasks/tasks-toggle/tasks-toggle-creators';
import { setAddNewTaskOpen, setTaskInfoOpen, setTaskMapPreviewOpen } from '../../../ducks/tasks/tasks-toggle/tasks-toggle';
import { listAnimation } from '../../../animations/animations';
import { deleteTask, getCompanyTasks } from '../../../ducks/tasks/tasks-data/task-data-creators';
import { Paragraph } from '../../../styles/typography/typography';
import { SpinnerWrapper, List, AddIcon, AddWrapper } from '../../../styles/shared';

const TaskPageContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allCompanyTasks, areTasksLoading } = useSelector((state: AppState) => state.tasks.taskData);
  const { isTaskInfoOpen, isTaskMapPreviewOpen, selectedTask } = useSelector((state: AppState) => state.tasks.taskToggle);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const filterByTaskName = (filterText: string, allTasks: TaskInterface[]): TaskInterface[] => {
    return allTasks.filter((task) => task.name.toLowerCase().includes(filterText.toLowerCase()));
  };

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
                    callback={() => dispatch(selectTask(task))}
                  />
                ))}
                <AddWrapper onClick={() => dispatch(setAddNewTaskOpen(true))}>
                  <AddIcon />
                  <Paragraph type={'add'}>Dodaj zadanie</Paragraph>
                </AddWrapper>
              </List>
              <ContentTemplate isOpen={isTaskInfoOpen} close={() => dispatch(setTaskInfoOpen(false))}>
                <TaskInfo isEditToggled={isEditToggled} setDeleteOpen={setDeleteOpen} setEditToggled={setEditToggled} />
              </ContentTemplate>
              <DeletePopup
                isOpen={isDeleteOpen}
                setOpen={setDeleteOpen}
                headerText={'Usuń zadanie'}
                text={`${selectedTask?.name}`}
                callback={() => selectedTask?._id && dispatch(deleteTask(selectedTask._id))}
              />
              <AddTaskController />
            </>
          )
        }
      />
      {selectedTask?.clientId && (
        <MapCoordsEdit
          isOpen={isTaskMapPreviewOpen}
          closeMap={() => dispatch(setTaskMapPreviewOpen(false))}
          lat={selectedTask?.clientId.lat}
          long={selectedTask?.clientId.long}
          type={CoordsEditType.View}
        />
      )}
    </>
  );
};

export default TaskPageContent;
