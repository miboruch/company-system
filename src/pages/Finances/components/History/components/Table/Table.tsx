import React from 'react';
import styled from 'styled-components';
import { Button } from 'components';
import { HistoryType } from '../../History';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

const Controller = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 2rem;
`;

interface Props {
  type: HistoryType;
  setType: React.Dispatch<React.SetStateAction<HistoryType>>;
}

const Table: React.FC<Props> = ({ type, setType }) => {
  const buttonText = type === 'income' ? 'Dodaj przychód' : 'Dodaj wydatek';

  const handleButtonClick = () => {
    type === 'income' ? setType('expense') : setType('income');
  };

  return (
    <Wrapper>
      <Controller>
        <div>
          <p>Przychód/Wydatek</p>
        </div>
        <Button onClick={handleButtonClick}>{buttonText}</Button>
      </Controller>
    </Wrapper>
  );
};

export default Table;
