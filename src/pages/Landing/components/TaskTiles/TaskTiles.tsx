import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import TaskTile from '../TaskTile/TaskTile';
import { useFetch, useShowContent } from 'components/hooks';
import { fetchTasks } from 'api';

import { TileWrapper } from './TaskTiles.styles';
import { Paragraph } from 'styles';

const TaskTiles: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const tasksData = useFetch(fetchTasks);
  const { showContent, showNoContent, showError, showLoader } = useShowContent(tasksData);
  const { payload: tasks } = tasksData;

  const handleTaskClick = (taskId: string) => () => history.push(`/company/${id}/tasks?task=${taskId}`);

  return (
    <TileWrapper>
      {showLoader && <Paragraph>Ładowanie...</Paragraph>}
      {showNoContent && <Paragraph>Brak danych</Paragraph>}
      {showError && <Paragraph>Problem z pobraniem danych</Paragraph>}
      {showContent &&
        tasks &&
        tasks.slice(0, 3).map((task) => <TaskTile key={task._id} task={task} onClick={handleTaskClick(task._id)} />)}
    </TileWrapper>
  );
};

export default TaskTiles;
