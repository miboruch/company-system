import React from 'react';
import { connect } from 'react-redux';
import { TaskInterface } from '../../../types/modelsTypes';
import { Tile, Description, Name, IncomeWrapper, TaskIncome, TaskExpense } from './TaskTile.styles';
import { CurrencyInterface } from '../../../types/actionTypes/toggleAcitonTypes';
import { AppState } from '../../../reducers/rootReducer';
import { roundTo2 } from '../../../utils/functions';

interface Props {
  task: TaskInterface;
  onClick?: () => void;
}

type ConnectedProps = Props & LinkStateProps;

const TaskTile: React.FC<ConnectedProps> = ({ task, onClick, currency }) => {
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

interface LinkStateProps {
  currency: CurrencyInterface;
}

const mapStateToProps = ({ toggleReducer: { currency } }: AppState): LinkStateProps => {
  return { currency };
};

export default connect(mapStateToProps)(TaskTile);
