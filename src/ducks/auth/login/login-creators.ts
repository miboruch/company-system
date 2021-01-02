import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from 'store/store';
import { setTokens } from '../tokens/tokens';
import { getUserData } from '../data/data-creators';
import { api } from 'api';
import { getUserNotifications } from '../../notifications/notifications-creators';

interface LoginInterface {
  email: string;
  password: string;
  callback: () => void;
}

export const login = createAsyncThunk<void, LoginInterface, baseStoreType>('login/login', async ({ email, password, callback }, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await api.post(`/auth/login`, { email, password });

    dispatch(setTokens({ token: data.token, refreshToken: data.refreshToken }));
    dispatch(getUserData());
    dispatch(getUserNotifications(1));
    callback();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
