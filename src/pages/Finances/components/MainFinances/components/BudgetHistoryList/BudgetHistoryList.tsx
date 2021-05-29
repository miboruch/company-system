import React from 'react';
import { useSelector } from 'react-redux';

import { ListBox } from 'components';
import { roundTo2 } from 'utils/functions';
import { AppState } from 'store/store';
import { ExpenseModel, IncomeModel } from 'types';

import { Paragraph } from 'styles';
import { StyledWrapper, ContentWrapper, Title } from './BudgetHistoryList.styles';
import { useRouteMatch } from 'react-router-dom';

interface Props {
  finances: (IncomeModel | ExpenseModel)[];
}

const BudgetHistoryList: React.FC<Props> = ({ finances }) => {
  const { url } = useRouteMatch();
  const { currency } = useSelector((state: AppState) => state.currency);

  const prepareExpenseValue = (income?: number, expense?: number) =>
    `${expense ? -1 * roundTo2(expense * currency.value) : income ? roundTo2(income * currency.value) : 0} ${currency.name}`;

  return (
    <StyledWrapper>
      <Title to={`${url}/history`}>Historia</Title>
      <ContentWrapper>
        {finances.length === 0 && <Paragraph>Brak danych</Paragraph>}
        {finances.map(({ _id, description, createdDate, incomeValue, expenseValue }) => (
          <ListBox
            key={_id}
            name={description}
            topDescription={new Date(createdDate).toLocaleDateString()}
            bottomDescription={incomeValue ? 'Przychód' : 'Wydatek'}
            isCompanyBox={false}
            isEmpty={true}
            value={prepareExpenseValue(incomeValue, expenseValue)}
          />
        ))}
      </ContentWrapper>
    </StyledWrapper>
  );
};

export default BudgetHistoryList;
