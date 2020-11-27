import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState, baseStoreType } from '../../../store/test-store';
import { adminApi } from '../../../api';
import { ExpenseInterface, IncomeDataInterface, IncomeInterface } from '../../../types/modelsTypes';
import { setNotificationMessage } from '../../popup/popup';
import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';
import { fetchAllFinancesData } from '../finances-creators';
import { Dispatch } from 'redux';
import axios from 'axios';
import { API_URL } from '../../../utils/config';

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

        dispatch(fetchAllFinancesData());
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

        dispatch(fetchAllFinancesData());
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

      dispatch(fetchAllFinancesData());
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

      dispatch(fetchAllFinancesData());
      dispatch(setNotificationMessage({ message: 'Usunięto wydatek' }));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: 'Problem z usunięciem wydatku', notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.data);
  }
});

interface GetIncomeExpenseDataInterface {
  daysBack: number, setData: (data: Array<any>) => void
}

export const getIncomeExpenseInTimePeriod = createAsyncThunk<void, GetIncomeExpenseDataInterface, baseStoreType>('incomeExpense/getIncomeExpenseInTimePeriod', async ({daysBack, setData}, { dispatch, getState, rejectWithValue }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

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
    return rejectWithValue(error.response.data);
  }
});
