import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from 'store/store';
import { TaskModel } from 'types';
import { roundTo2 } from 'utils/functions';
import { Tile, Description, Name, IncomeWrapper, TaskIncome, TaskExpense } from './TaskTile.styles';

interface Props {
  task: TaskModel;
  onClick?: () => void;
}

const TaskTile: React.FC<Props> = ({ task, onClick }) => {
  const { currency } = useSelector((state: AppState) => state.currency);

  const header = task.isCompleted ? 'Ukończone zadanie' : 'Aktywne zadanie';

  const incomeValue = task.taskIncome ? roundTo2(task.taskIncome * currency.value) : 0;
  const expenseValue = task.taskExpense ? roundTo2(task.taskExpense * currency.value) : 0;

  return (
    <Tile onClick={() => !!onClick && onClick()}>
      <Description>{header}</Description>
      <Name>{task.name}</Name>
      <IncomeWrapper>
        <TaskIncome>
          + {incomeValue} {currency.name}
        </TaskIncome>
        <TaskExpense>
          - {expenseValue} {currency.name}
        </TaskExpense>
      </IncomeWrapper>
    </Tile>
  );
};

export default TaskTile;
