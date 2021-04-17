import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserModel } from 'types';
import { baseStoreType } from 'store/store';
import { companyApi } from 'api';

export const getAllAppUsers = createAsyncThunk<UserModel[], void, baseStoreType>(
  'allUsers/getAllUsers',
  async (_arg, { rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;

    try {
      if (token) {
        const { data } = await companyApi.get(`/user/app`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return data as UserModel[];
      } else {
        return rejectWithValue('Brak tokena');
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
