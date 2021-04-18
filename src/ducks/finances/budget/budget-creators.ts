import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from 'store/store';
import { companyApi } from 'api';

export const getCompanyBudget = createAsyncThunk<number, void, baseStoreType>(
  'budget/getCompanyBudget',
  async (daysBack, { dispatch, getState, rejectWithValue }) => {
    const { token } = getState().auth.tokens;

    try {
      if (token) {
        const { data } = await companyApi.get(`/budget`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return data.budget;
      } else {
        return rejectWithValue('Brak uwierzytelnienia');
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
