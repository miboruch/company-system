import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from '../../../store/test-store';
import { setNotificationMessage } from '../../popup/popup';
import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { CompanyInterface } from '../../../types/modelsTypes';
import { authApi } from '../../../api';
import { resetAllSelected } from '../../reset/reset-creators';

export const getUserCompanies = createAsyncThunk<CompanyInterface[], void, baseStoreType>('companies/getUserCompanies', async (_arg, { dispatch, rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth.tokens;
    const { role } = getState().auth.roles;

    if (token && role) {
      const { data } = await authApi.get(role === UserRole.Admin ? `/user/get-user-companies` : `/employee/get-employee-companies`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(resetAllSelected());
      return data as CompanyInterface[];
    } else {
      return [] as CompanyInterface[];
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.data);
  }
});
