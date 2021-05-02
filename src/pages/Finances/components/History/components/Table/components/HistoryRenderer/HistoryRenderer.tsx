import React from 'react';

import Incomes from './components/Incomes/Incomes';
import Expenses from './components/Expenses/Expenses';
import { HistoryType } from 'pages/Finances/components/History/History';

interface Props {
  type: HistoryType;
}

const HistoryRenderer: React.FC<Props> = ({ type }) => {
  return (
    <div>
      {type === 'income' && <Incomes />}
      {type === 'expense' && <Expenses />}
    </div>
  );
};

export default HistoryRenderer;
