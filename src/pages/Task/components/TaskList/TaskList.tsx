import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import { ListBox } from 'components';
import { useFetch, useShowContent, useQuery } from 'components/hooks';
import { listAnimation } from 'animations/animations';
import { fetchTasks } from 'api';
import { AppState } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { TaskModel } from 'types';

import { AddIcon, AddWrapper, List, Paragraph } from 'styles';

interface Props {
  filterText: string;
  refreshDate: Date;
  handleAddTaskOpen: () => void;
}

const TaskList: React.FC<Props> = ({ filterText, refreshDate, handleAddTaskOpen }) => {
  const { setQuery } = useQuery();
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const tasksData = useFetch(fetchTasks, { dependencies: [refreshDate] });
  const { showContent, showLoader, showNoContent, showError } = useShowContent(tasksData);
  const { payload: tasks } = tasksData;

  const filterByTaskName = (filterText: string, allTasks: TaskModel[]): TaskModel[] => {
    return allTasks.filter((task) => task.name.toLowerCase().includes(filterText.toLowerCase()));
  };

  const handleTaskClick = (taskId: string) => () => setQuery('task', taskId);

  useEffect(() => {
    listAnimation(tl, listRef);
  }, [showContent]);

  return (
    <List ref={listRef}>
      {showNoContent && <Paragraph>Brak danych</Paragraph>}
      {showLoader && <Paragraph>Ładowanie</Paragraph>}
      {showError && <Paragraph>Problem z załadowaniem danych</Paragraph>}
      {showContent &&
        tasks &&
        filterByTaskName(filterText, tasks).map((task) => (
          <ListBox
            key={task._id}
            name={task.name}
            topDescription={new Date(task.date).toLocaleDateString()}
            bottomDescription={task.description}
            isCompanyBox={false}
            isChecked={task.isCompleted}
            callback={handleTaskClick(task._id)}
          />
        ))}
      {role === UserRole.Admin && (
        <AddWrapper onClick={handleAddTaskOpen}>
          <AddIcon />
          <Paragraph type={'add'}>Dodaj zadanie</Paragraph>
        </AddWrapper>
      )}
    </List>
  );
};

export default TaskList;
