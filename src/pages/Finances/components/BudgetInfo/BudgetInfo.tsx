import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import BudgetTile from '../BudgetTile/BudgetTile';
import { fetchCompanyBudget, fetchIncomeExpense } from 'api';
import { useFetch, useShowContent } from 'components/hooks';
import { roundTo2 } from 'utils/functions';
import { AppState } from 'store/store';
import { ExpenseModel, IncomeModel } from 'types';

import { BudgetWrapper } from '../../Finances.styles';
import { Paragraph } from 'styles';

const BudgetInfo: React.FC = () => {
  const { currency } = useSelector((state: AppState) => state.currency);

  const companyBudgetData = useFetch<typeof fetchCompanyBudget>(fetchCompanyBudget);
  const { showNoContent, showError } = useShowContent(companyBudgetData);
  const { payload: companyBudget } = companyBudgetData;

  const incomeExpenseData = useFetch<typeof fetchIncomeExpense>(fetchIncomeExpense);
  const { showContent, showLoader, showError: incomeExpenseError } = useShowContent(incomeExpenseData);
  const { payload: incomeExpense } = incomeExpenseData;

  const financesHistory = useMemo(() => {
    if (incomeExpense) {
      return [...incomeExpense.incomes, ...incomeExpense.expenses];
    }
  }, [incomeExpense]);

  const prepareExpenseValue = (history: IncomeModel | ExpenseModel) =>
    history.expenseValue
      ? -1 * roundTo2(history.expenseValue * currency.value)
      : history.incomeValue
      ? roundTo2(history.incomeValue * currency.value)
      : 0;

  const companyBudgetValue = companyBudget ? roundTo2(companyBudget.budget * currency.value) : 0;
  const companyBudgetHeader = showNoContent || showError ? 'Problem z załadowaniem' : 'Aktualny budżet firmy';

  return (
    <BudgetWrapper>
      {showLoader && <Paragraph>Ładowanie</Paragraph>}
      {incomeExpenseError && <Paragraph>Błąd ładowania danych</Paragraph>}
      {showContent && companyBudget && financesHistory && (
        <>
          <BudgetTile description={'Budżet firmy'} name={companyBudgetHeader} value={companyBudgetValue} />
          {financesHistory.slice(0, 2).map((history) => (
            <BudgetTile
              key={history._id}
              description={'Finanse'}
              value={prepareExpenseValue(history)}
              name={history.description}
            />
          ))}
        </>
      )}
    </BudgetWrapper>
  );
};

export default BudgetInfo;
