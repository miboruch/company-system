import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserAuthData } from '../../../types/modelsTypes';
import { AppDispatch, AppState } from '../../../store/test-store';
import { authApi } from '../../../api';
import { API_URL } from '../../../utils/config';

export const getUserData = createAsyncThunk<UserAuthData, void, { dispatch: AppDispatch; state: AppState }>('data/userData', async (_arg, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth.tokens;
    const { data } = await authApi.get('/user/user-data');
    // const { data } = await axios.get(`${API_URL}/user/user-data`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });

    return data as UserAuthData;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});
