import React from 'react';
import { useSelector } from 'react-redux';

import { ListBox } from 'components';
import { roundTo2 } from 'utils/functions';
import { IncomeModel, ExpenseModel } from 'types';
import { AppState } from 'store/store';

import { Paragraph, EmptyWrapper } from 'styles';
import { StyledWrapper, ContentWrapper, Title } from './BudgetHistoryList.styles';

interface Props {
  budgetHistory: (IncomeModel | ExpenseModel)[];
}

const BudgetHistoryList: React.FC<Props> = ({ budgetHistory }) => {
  const { currency } = useSelector((state: AppState) => state.currency);

  const prepareExpenseValue = (history: IncomeModel | ExpenseModel) =>
    `${
      history.expenseValue
        ? -1 * roundTo2(history.expenseValue * currency.value)
        : history.incomeValue
        ? roundTo2(history.incomeValue * currency.value)
        : 0
    } ${currency.name}`;

  return (
    <StyledWrapper>
      <Title>Historia</Title>
      <ContentWrapper>
        {budgetHistory.length === 0 ? (
          <EmptyWrapper>
            <Paragraph type={'empty'}>Brak danych</Paragraph>
          </EmptyWrapper>
        ) : (
          budgetHistory.map((history, index: number) => (
            <ListBox
              key={history._id}
              name={history.description}
              topDescription={new Date(history.createdDate).toLocaleDateString()}
              bottomDescription={history.incomeValue ? 'Przychód' : 'Wydatek'}
              isCompanyBox={false}
              isEmpty={true}
              value={prepareExpenseValue(history)}
            />
          ))
        )}
      </ContentWrapper>
    </StyledWrapper>
  );
};

export default BudgetHistoryList;
