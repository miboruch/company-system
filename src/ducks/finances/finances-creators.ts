import { AppDispatch } from 'store/store';
import { getCompanyIncomeAndExpense, getLastIncomesAndExpenses } from './income-expense/income-expense-creators';
import { getCompanyBudget } from './budget/budget-creators';
import { FINANCES_DATA_DAYS_BACK } from 'utils/config';

export const fetchAllFinancesData = () => (dispatch: AppDispatch): void => {
  dispatch(getCompanyIncomeAndExpense(FINANCES_DATA_DAYS_BACK));
  dispatch(getLastIncomesAndExpenses(5));
  dispatch(getCompanyBudget());
};
