import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from '../../../store/test-store';
import { adminApi } from '../../../api';

export const getCompanyBudget = createAsyncThunk<number, void, baseStoreType>('budget/getCompanyBudget', async (daysBack, { dispatch, getState, rejectWithValue }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      const { data } = await adminApi.get(`/budget/get-company-budget`);

      return data.budget;
    } else {
      return rejectWithValue('Brak uwierzytelnienia');
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
