import React from 'react';

import HistoryRenderer from './components/HistoryRenderer/HistoryRenderer';
import HistoryHeader from './components/HistoryHeader/HistoryHeader';
import { Button } from 'components';
import { HistoryType } from '../../History';

import { Wrapper, Controller } from './Table.styles';

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
      <HistoryHeader />
      <HistoryRenderer type={type} />
    </Wrapper>
  );
};

export default Table;
