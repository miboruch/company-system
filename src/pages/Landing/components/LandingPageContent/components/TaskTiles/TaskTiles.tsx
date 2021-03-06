import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import TaskTile from '../TaskTile/TaskTile';
import { useFetch, useShowContent } from 'components/hooks';
import { fetchTasks } from 'api/tasks/api.tasks';
import { TaskInterface } from 'types/modelsTypes';

import { TileWrapper } from './TaskTiles.styles';
import { Paragraph } from 'styles';

const TaskTiles: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const tasksData = useFetch<typeof fetchTasks>(fetchTasks(id));
  const { showContent, showNoContent, showError, showLoader } = useShowContent(tasksData);
  const { payload } = tasksData;

  const handleTaskClick = (task: TaskInterface) => () => history.push(`/admin/tasks/${id}`);

  return (
    <TileWrapper>
      {showLoader && <Paragraph>Ładowanie...</Paragraph>}
      {showNoContent && <Paragraph>Brak danych</Paragraph>}
      {showError && <Paragraph>Problem z pobraniem danych</Paragraph>}
      {showContent &&
        payload &&
        payload.slice(0, 3).map((task) => <TaskTile key={task._id} task={task} onClick={handleTaskClick(task)} />)}
    </TileWrapper>
  );
};

export default TaskTiles;
