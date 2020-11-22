import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from '../../../store/test-store';
import { api } from '../../../api';
import { setTokens } from '../tokens/tokens';
import { getUserData } from '../data/data-creators';
import { setLogged } from '../check/check';
import { authTimeout } from '../check/check-creators';

interface LoginInterface {
  email: string;
  password: string;
  callback: () => void;
}

export const login = createAsyncThunk<void, LoginInterface, baseStoreType>('login/login', async ({ email, password, callback }: LoginInterface, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await api.post(`/auth/login`, { email, password });

    dispatch(setTokens({ token: data.token, refreshToken: data.refreshToken, expireIn: data.expireIn }));
    dispatch(getUserData());

    const milliseconds = data.expireIn - new Date().getTime();
    dispatch(setLogged(true));
    dispatch(authTimeout({ refreshToken: data.refreshToken, expireMilliseconds: milliseconds }));
    callback();
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});
