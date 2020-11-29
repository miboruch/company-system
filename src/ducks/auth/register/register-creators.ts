import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { setTokens } from '../tokens/tokens';
import { getUserData } from '../data/data-creators';
import { baseStoreType } from '../../../store/test-store';

interface RegisterInterface {
  email: string;
  password: string;
  repeatedPassword: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  callback: () => void;
}

export const register = createAsyncThunk<void, RegisterInterface, baseStoreType>('register/register', async ({ callback, ...values }, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await api.post(`/auth/register`, { ...values });

    //TODO: dispatch actions
    dispatch(setTokens({ token: data.token, refreshToken: data.refreshToken, expireIn: data.expireIn }));
    dispatch(getUserData());
    callback();
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});
