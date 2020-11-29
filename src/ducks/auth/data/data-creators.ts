import { createAsyncThunk } from '@reduxjs/toolkit';
import { EmployeeDataInterface, UserAuthData } from '../../../types/modelsTypes';
import { baseStoreType } from '../../../store/test-store';
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
    return rejectWithValue(error.response.data);
  }
});

export const getOwnEmployeeData = createAsyncThunk<EmployeeDataInterface, string, baseStoreType>('data/getOwnEmployeeData', async (companyId, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth.tokens;

    const { data } = await authApi.get(`/employee/employee-data?company_id=${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return data.employees[0] as EmployeeDataInterface;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response);
  }
});
