import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthModel, EmployeeModel } from 'types';
import { baseStoreType } from 'store/store';
import { authApi } from 'api';

export const getUserData = createAsyncThunk<UserAuthModel, string | void, baseStoreType>(
  'data/userData',
  async (argToken, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth.tokens;

      if (argToken) {
        const { data } = await authApi.get(`/user`, {
          headers: {
            Authorization: `Bearer ${argToken}`
          }
        });

        return data as UserAuthModel;
      } else {
        const { data } = await authApi.get(`/user/user-data`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return data as UserAuthModel;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOwnEmployeeData = createAsyncThunk<EmployeeModel, string, baseStoreType>(
  'data/getOwnEmployeeData',
  async (companyId, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth.tokens;

      const { data } = await authApi.get(`/employee/employee-data`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data.employees[0] as EmployeeModel;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
