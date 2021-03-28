import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from 'store/store';
import { setNotificationMessage } from '../../popup/popup';
import { NotificationTypes } from 'types/globalTypes';
import { UserRole } from '../../auth/roles/roles';
import { CompanyModel } from 'types';
import { companyApi } from 'api';
import { resetAllSelected } from '../../reset/reset-creators';

export const getUserCompanies = createAsyncThunk<CompanyModel[], void, baseStoreType>(
  'companies/getUserCompanies',
  async (_arg, { dispatch, rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth.tokens;
      const { role } = getState().auth.roles;

      if (token && role) {
        const { data } = await companyApi.get(
          role === UserRole.Admin ? `/user/get-user-companies` : `/employee/get-employee-companies`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        dispatch(resetAllSelected());
        return data as CompanyModel[];
      } else {
        return [] as CompanyModel[];
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
      return rejectWithValue(error.response.data);
    }
  }
);

interface CreateCompanyInterface {
  name: string;
  nip: string;
  address: string;
  lat: number;
  long: number;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  callback?: () => void;
}

export const createNewCompany = createAsyncThunk<void, CreateCompanyInterface, baseStoreType>(
  'companies/createNewCompany',
  async (values, { dispatch, rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;
    const { callback, ...companyData } = values;

    try {
      if (token) {
        await companyApi.post(
          '/company',
          { ...companyData },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        dispatch(getUserCompanies());
        callback && callback();
      } else {
        return rejectWithValue('Brak tokena');
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
