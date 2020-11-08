import axios from 'axios';
import { ExpenseInterface, IncomeDataInterface, IncomeInterface } from '../types/modelsTypes';
import {
  RESET_FINANCES,
  ResetFinances,
  SET_BUDGET_ERROR,
  SET_BUDGET_EXPENSE,
  SET_BUDGET_INCOME,
  SET_BUDGET_LOADING,
  SET_COMPANY_BUDGET,
  SET_LAST_EXPENSES,
  SET_LAST_INCOMES,
  SetBudgetError,
  SetBudgetExpense,
  SetBudgetIncome,
  SetBudgetLoading,
  SetCompanyBudget,
  SetLastExpenses,
  SetLastIncomes
} from '../types/actionTypes/financeActionTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { AppState } from '../reducers/rootReducer';
import { API_URL, FINANCES_DATA_DAYS_BACK } from '../utils/config';
import { setNotificationMessage } from './toggleActions';
import { NotificationTypes } from '../types/actionTypes/toggleAcitonTypes';

const setBudgetLoading = (isLoading: boolean): SetBudgetLoading => {
  return {
    type: SET_BUDGET_LOADING,
    payload: isLoading
  };
};

const setBudgetIncome = (income: number): SetBudgetIncome => {
  return {
    type: SET_BUDGET_INCOME,
    payload: income
  };
};

const setBudgetExpense = (expense: number): SetBudgetExpense => {
  return {
    type: SET_BUDGET_EXPENSE,
    payload: expense
  };
};

const setCompanyBudget = (budget: number): SetCompanyBudget => {
  return {
    type: SET_COMPANY_BUDGET,
    payload: budget
  };
};

const setLastIncomes = (lastIncomes: IncomeInterface[]): SetLastIncomes => {
  return {
    type: SET_LAST_INCOMES,
    payload: lastIncomes
  };
};

const setLastExpenses = (lastExpenses: ExpenseInterface[]): SetLastExpenses => {
  return {
    type: SET_LAST_EXPENSES,
    payload: lastExpenses
  };
};

const setBudgetError = (error: string | null): SetBudgetError => {
  return {
    type: SET_BUDGET_ERROR,
    payload: error
  };
};

const getCompanyIncomeAndExpense = (daysBack: number) => async (dispatch: Dispatch<AppTypes>, getState: () => AppState) => {
  dispatch(setBudgetLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      const { data } = await axios.get(`${API_URL}/budget/get-income-expense?company_id=${currentCompany._id}&daysBack=${daysBack}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setBudgetIncome(data.income));
      dispatch(setBudgetExpense(data.expense));
      dispatch(setBudgetLoading(false));
    }
  } catch (error) {
    dispatch(setBudgetError(error));
  }
};

const getLastIncomesAndExpenses = (limit?: number) => async (dispatch: Dispatch<AppTypes>, getState: () => AppState) => {
  dispatch(setBudgetLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      const { data } = await axios.get(`${API_URL}/budget/get-last-income-expense?company_id=${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setLastIncomes(data.incomes));
      dispatch(setLastExpenses(data.expenses));
      dispatch(setBudgetLoading(false));
    }
  } catch (error) {
    dispatch(setBudgetError(error));
  }
};

const getCompanyBudget = () => async (dispatch: Dispatch<AppTypes>, getState: () => AppState) => {
  dispatch(setBudgetLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      const { data } = await axios.get(`${API_URL}/budget/get-company-budget?company_id=${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setCompanyBudget(data.budget));
      dispatch(setBudgetLoading(false));
    }
  } catch (error) {
    dispatch(setBudgetError(error));
  }
};

export const fetchAllFinancesData = () => async (dispatch: Dispatch<any>) => {
  dispatch(getCompanyIncomeAndExpense(FINANCES_DATA_DAYS_BACK));
  dispatch(getLastIncomesAndExpenses(3));
  dispatch(getCompanyBudget());
};

export const getIncomeExpenseInTimePeriod = (daysBack: number, setData: (data: Array<any>) => void) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      const { data } = await axios.get(`${API_URL}/income/get-last-incomes?company_id=${currentCompany._id}&daysBack=${daysBack}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { data: expenseData } = await axios.get(`${API_URL}/expense/get-last-expenses?company_id=${currentCompany._id}&daysBack=${daysBack}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(
        data.map((income: IncomeDataInterface, index: number) => ({
          ...income,
          expenseValue: expenseData[index].expenseValue,
          createdDate: new Date(income.createdDate).toLocaleDateString()
        }))
      );
    }
  } catch (error) {
    console.log(error);
    dispatch(setBudgetLoading(true));
  }
};

export const addIncome = (incomeValue: number, description: string, callback: () => void) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  dispatch(setBudgetLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      await axios.post(
        `${API_URL}/income/add-income?company_id=${currentCompany._id}`,
        {
          incomeValue,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(fetchAllFinancesData());
      dispatch(setBudgetLoading(false));
      callback();
      dispatch(setNotificationMessage('Dodano nowy przychód'));
    }
  } catch (error) {
    dispatch(setBudgetError(error));
    dispatch(setNotificationMessage('Problem z dodaniem przychodu', NotificationTypes.Error));
  }
};

export const addExpense = (expenseValue: number, description: string, callback: () => void) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  dispatch(setBudgetLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      await axios.post(
        `${API_URL}/expense/add-expense?company_id=${currentCompany._id}`,
        {
          expenseValue,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(fetchAllFinancesData());
      dispatch(setBudgetLoading(false));
      callback();
      dispatch(setNotificationMessage('Dodano nowy wydatek'));
    }
  } catch (error) {
    dispatch(setBudgetError(error));
    dispatch(setNotificationMessage('Problem z dodaniem wydatku', NotificationTypes.Error));
  }
};

export const deleteIncome = (incomeId: number) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  dispatch(setBudgetLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      await axios.delete(`${API_URL}/income/remove-income/${incomeId}?company_id=${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(fetchAllFinancesData());
      dispatch(setBudgetLoading(false));
    }
  } catch (error) {
    dispatch(setBudgetError(error));
  }
};

export const deleteExpense = (expenseId: number) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  dispatch(setBudgetLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      await axios.delete(`${API_URL}/expense/remove-expense/${expenseId}?company_id=${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(fetchAllFinancesData());
      dispatch(setBudgetLoading(false));
    }
  } catch (error) {
    dispatch(setBudgetError(error));
  }
};

export const resetFinances = (): ResetFinances => {
  return {
    type: RESET_FINANCES
  };
};
