import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from '../../../store/test-store';
import { adminApi } from '../../../api';
import { ExpenseInterface, IncomeInterface } from '../../../types/modelsTypes';
import { setNotificationMessage } from '../../popup/popup';
import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';

export interface IncomeExpenseReturnInterface {
  income: number;
  expense: number;
}

export const getCompanyIncomeAndExpense = createAsyncThunk<IncomeExpenseReturnInterface, number, baseStoreType>(
  'incomeExpense/getCompanyIncomeAndExpense',
  async (daysBack, { dispatch, getState, rejectWithValue }) => {
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (token && currentCompany) {
        const { data } = await adminApi.get(`/budget/get-income-expense?daysBack=${daysBack}`);

        return { income: data.income, expense: data.expense } as IncomeExpenseReturnInterface;
      } else {
        return { income: 0, expense: 0 } as IncomeExpenseReturnInterface;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export interface LastIncomesExpensesReturnInterface {
  lastIncomes: IncomeInterface[];
  lastExpenses: ExpenseInterface[];
}

export const getLastIncomesAndExpenses = createAsyncThunk<LastIncomesExpensesReturnInterface, number, baseStoreType>(
  'incomeExpense/getLastIncomesAndExpenses',
  async (daysBack, { dispatch, getState, rejectWithValue }) => {
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (token && currentCompany) {
        const { data } = await adminApi.get(`/budget/get-last-income-expense`);

        return { lastIncomes: data.incomes, lastExpenses: data.expenses } as LastIncomesExpensesReturnInterface;
      } else {
        return { lastIncomes: [], lastExpenses: [] } as LastIncomesExpensesReturnInterface;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface AddIncomeInterface {
  incomeValue: number;
  description: string;
  callback: () => void;
}

// +loading
export const addIncome = createAsyncThunk<void, AddIncomeInterface, baseStoreType>(
  'incomeExpense/addIncome',
  async ({ incomeValue, description, callback }, { dispatch, getState, rejectWithValue }) => {
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (token && currentCompany) {
        await adminApi.post(`/income/add-income`, { incomeValue, description });

        //TODO: dispatch(fetch all finances data);
        callback();
        dispatch(setNotificationMessage({ message: 'Dodano przychód' }));
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: 'Problem z dodaniem przychodu', notificationType: NotificationTypes.Error }));
      return rejectWithValue(error.response.data);
    }
  }
);

interface AddExpenseInterface {
  expenseValue: number;
  description: string;
  callback: () => void;
}
// +loading
export const addExpense = createAsyncThunk<void, AddExpenseInterface, baseStoreType>(
  'incomeExpense/addExpense',
  async ({ expenseValue, description, callback }, { dispatch, getState, rejectWithValue }) => {
    const { token } = getState().auth.tokens;
    const { currentCompany } = getState().company.currentCompany;

    try {
      if (token && currentCompany) {
        await adminApi.post(`/expense/add-expense`, { expenseValue, description });

        //TODO: dispatch(fetch all finances data);
        callback();
        dispatch(setNotificationMessage({ message: 'Dodano wydatek' }));
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: 'Problem z dodaniem wydatku', notificationType: NotificationTypes.Error }));
      return rejectWithValue(error.response.data);
    }
  }
);

// +loading
export const deleteIncome = createAsyncThunk<void, number, baseStoreType>('incomeExpense/deleteIncome', async (incomeId, { dispatch, getState, rejectWithValue }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      await adminApi.delete(`/income/remove-income/${incomeId}`);

      //TODO: dispatch(fetch all finances data);
      dispatch(setNotificationMessage({ message: 'Usunięto przychód' }));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: 'Problem z usunięciem przychodu', notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.data);
  }
});

// +loading
export const deleteExpense = createAsyncThunk<void, number, baseStoreType>('incomeExpense/deleteExpense', async (expenseId, { dispatch, getState, rejectWithValue }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      await adminApi.delete(`/expense/remove-expense/${expenseId}`);

      //TODO: dispatch(fetch all finances data);
      dispatch(setNotificationMessage({ message: 'Usunięto wydatek' }));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: 'Problem z usunięciem wydatku', notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.data);
  }
});
