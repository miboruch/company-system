import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserAuthData } from '../../../types/modelsTypes';
import { baseStoreType } from '../../../store/test-store';
import { API_URL } from '../../../utils/config';
import { authApi } from '../../../api';

export const getUserData = createAsyncThunk<UserAuthData, string | void, baseStoreType>('data/userData', async (argToken, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth.tokens;

    if (argToken) {
      const { data } = await authApi.get(`/user/user-data`, {
        headers: {
          Authorization: `Bearer ${argToken}`
        }
      });

      return data as UserAuthData;
    } else {
      const { data } = await authApi.get(`/user/user-data`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data as UserAuthData;
    }
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});
