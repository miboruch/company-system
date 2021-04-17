import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import BudgetTile from '../BudgetTile/BudgetTile';
import { fetchCompanyBudget, fetchIncomeExpense } from 'api';
import { useFetch, useShowContent } from 'components/hooks';
import { roundTo2 } from 'utils/functions';
import { AppState } from 'store/store';

import { Paragraph } from 'styles';
import { BudgetWrapper } from '../../Finances.styles';
import { ExpenseModel, IncomeModel } from 'types';

interface Props {
  setFinances: React.Dispatch<React.SetStateAction<(IncomeModel | ExpenseModel)[]>>;
}

const BudgetInfo: React.FC<Props> = ({ setFinances }) => {
  const { currency } = useSelector((state: AppState) => state.currency);

  const companyBudgetData = useFetch<typeof fetchCompanyBudget>(fetchCompanyBudget);
  const { showNoContent, showError } = useShowContent(companyBudgetData);
  const { payload: companyBudget } = companyBudgetData;

  const incomeExpenseData = useFetch<typeof fetchIncomeExpense>(fetchIncomeExpense);
  const { showContent, showLoader, showError: incomeExpenseError } = useShowContent(incomeExpenseData);
  const { payload: incomeExpense } = incomeExpenseData;
  console.log(incomeExpense);

  const financesHistory = useMemo(() => {
    if (incomeExpense) {
      return [...incomeExpense.incomes, ...incomeExpense.expenses];
    }
  }, [incomeExpense]);

  useEffect(() => {
    if (financesHistory) {
      setFinances(financesHistory);
    }
  }, [financesHistory]);

  const prepareExpenseValue = (income?: number, expense?: number): number =>
    expense ? -1 * roundTo2(expense * currency.value) : income ? roundTo2(income * currency.value) : 0;

  const companyBudgetValue = companyBudget ? roundTo2(companyBudget.budget * currency.value) : 0;
  const companyBudgetHeader = showNoContent || showError ? 'Problem z załadowaniem' : 'Aktualny budżet firmy';

  return (
    <BudgetWrapper>
      {showLoader && <Paragraph>Ładowanie</Paragraph>}
      {incomeExpenseError && <Paragraph>Błąd ładowania danych</Paragraph>}
      {showContent && companyBudget && financesHistory && (
        <>
          <BudgetTile description={'Budżet firmy'} name={companyBudgetHeader} value={companyBudgetValue} />
          {financesHistory.slice(0, 2).map(({ _id, description, incomeValue, expenseValue }) => (
            <BudgetTile
              key={_id}
              name={description}
              description={'Finanse'}
              value={prepareExpenseValue(incomeValue, expenseValue)}
            />
          ))}
        </>
      )}
    </BudgetWrapper>
  );
};

export default BudgetInfo;
