import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserDataInterface } from '../../types/modelsTypes';
import { baseStoreType } from '../../store/test-store';
import { authApi } from '../../api';

export const getAllAppUsers = createAsyncThunk<UserDataInterface[], void, baseStoreType>('allUsers/getAllUsers', async (_arg, { rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      const { data } = await authApi.get(`/user/get-all-users-except-company-owners`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data as UserDataInterface[];
    } else {
      return rejectWithValue('Brak tokena');
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
