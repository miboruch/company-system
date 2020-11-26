import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserAuthData } from '../../../types/modelsTypes';
import { baseStoreType } from '../../../store/test-store';
import { API_URL } from '../../../utils/config';
import { authApi } from '../../../api';

export const getUserData = createAsyncThunk<UserAuthData, void, baseStoreType>('data/userData', async (_arg, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth.tokens;

    if (token) {
      const { data } = await axios.get(`${API_URL}/user/user-data`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data as UserAuthData;
    } else {
      return rejectWithValue('Brak danych');
    }
    // const { data } = await axios.get(`${API_URL}/user/user-data`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });

    // return data as UserAuthData;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});
