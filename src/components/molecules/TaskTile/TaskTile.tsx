import React from 'react';
import { TaskInterface } from '../../../types/modelsTypes';
import { Tile, Description, Name, IncomeWrapper, TaskIncome, TaskExpense } from './TaskTile.styles';

interface Props {
  task: TaskInterface;
  onClick?: () => void;
}

const TaskTile: React.FC<Props> = ({ task, onClick }) => {
  return (
    <Tile onClick={() => !!onClick && onClick()}>
      <Description>{task.isCompleted ? 'Ukończone zadanie' : 'Aktywne zadanie'}</Description>
      <Name>{task.name}</Name>
      <IncomeWrapper>
        <TaskIncome>+ {task.taskIncome} PLN</TaskIncome>
        <TaskExpense>- {task.taskExpense ? task.taskExpense : 0} PLN</TaskExpense>
      </IncomeWrapper>
    </Tile>
  );
};

export default TaskTile;
