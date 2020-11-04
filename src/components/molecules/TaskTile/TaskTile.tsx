import React, { useState } from 'react';
import styled from 'styled-components';
import { TaskInterface } from '../../../types/modelsTypes';

const Tile = styled.div`
  width: 225px;
  height: 225px;
  padding: 2rem;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  border-radius: 30px;
  white-space: normal;
  margin-right: 2rem;
  cursor: pointer;

  ${({ theme }) => theme.mq.hdReady} {
    width: 278px;
    height: 183px;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.descriptionGray};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: 12px;
  margin-bottom: 2rem;
`;

const Name = styled.p`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 20px;
  letter-spacing: -1px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

const IncomeWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 3rem;
`;

const TaskIncome = styled.p`
  font-size: 12px;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  color: ${({ theme }) => theme.colors.green};
`;

const TaskExpense = styled(TaskIncome)`
  color: ${({ theme }) => theme.colors.red};
`;

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
