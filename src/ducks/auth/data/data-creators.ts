import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthData } from '../../../types/modelsTypes';
import { AppDispatch, AppState } from '../../../store/test-store';
import { authApi } from '../../../api';

export const getUserData = createAsyncThunk<UserAuthData, void, { dispatch: AppDispatch; state: AppState }>('data/userData', async (_arg, { rejectWithValue }) => {
  try {
    const { data } = await authApi.get('/user/user-data');

    return data as UserAuthData;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});
