import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { TaskInterface } from '../../../types/modelsTypes';
import { roundTo2 } from '../../../utils/functions';
import { Tile, Description, Name, IncomeWrapper, TaskIncome, TaskExpense } from './TaskTile.styles';

interface Props {
  task: TaskInterface;
  onClick?: () => void;
}

const TaskTile: React.FC<Props> = ({ task, onClick }) => {
  const { currency } = useSelector((state: AppState) => state.currency);
  return (
    <Tile onClick={() => !!onClick && onClick()}>
      <Description>{task.isCompleted ? 'Ukończone zadanie' : 'Aktywne zadanie'}</Description>
      <Name>{task.name}</Name>
      <IncomeWrapper>
        <TaskIncome>
          + {task.taskIncome ? roundTo2(task.taskIncome * currency.value) : 0} {currency.name}
        </TaskIncome>
        <TaskExpense>
          - {task.taskExpense ? roundTo2(task.taskExpense * currency.value) : 0} {currency.name}
        </TaskExpense>
      </IncomeWrapper>
    </Tile>
  );
};

export default TaskTile;
