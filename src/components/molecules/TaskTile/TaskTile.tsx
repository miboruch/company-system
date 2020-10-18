import React from 'react';
import styled from 'styled-components';

const Tile = styled.div`
  width: 225px;
  height: 225px;
  padding: 2rem;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  border-radius: 30px;
  white-space: normal;
  margin-right: 2rem;

  ${({ theme }) => theme.mq.hdReady} {
    width: 278px;
    height: 183px;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.descriptionGray};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  letter-spacing: 1px;
  font-size: 12px;
  margin-bottom: 2rem;
`;

const Name = styled.p`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 20px;
  letter-spacing: -1px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

interface Props {
  isCompleted: boolean;
  name: string;
}

const TaskTile: React.FC<Props> = ({ isCompleted, name }) => {
  return (
    <Tile>
      <Description>{isCompleted ? 'Ukończone zadanie' : 'Aktywne zadanie'}</Description>
      <Name>{name}</Name>
    </Tile>
  );
};

export default TaskTile;
