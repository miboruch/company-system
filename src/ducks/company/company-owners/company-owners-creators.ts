import { createAsyncThunk } from '@reduxjs/toolkit';

import { setNotificationMessage } from '../../popup/popup';
import { CompanyOwnersModel } from 'types';
import { baseStoreType } from 'store/store';
import { NotificationTypes } from 'types/globalTypes';
import { companyApi } from 'api';
import { getAllCompanyEmployees } from '../../employees/employees-data/employees-data-creators';

export const getCompanyOwners = createAsyncThunk<CompanyOwnersModel[], void, baseStoreType>(
  'companyOwners/getCompanyOwners',
  async (_arg, { dispatch, rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth.tokens;

      if (token) {
        const { data } = await companyApi.get('/company/owners', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return data.owners as CompanyOwnersModel[];
      } else {
        return [] as CompanyOwnersModel[];
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewCompanyOwner = createAsyncThunk<void, string, baseStoreType>(
  'companyOwners/addNewCompanyOwner',
  async (userId, { dispatch, getState }) => {
    try {
      const { token } = getState().auth.tokens;

      if (token) {
        await companyApi.post(
          '/company/owner',
          { toBeOwnerId: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        dispatch(getCompanyOwners());
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    }
  }
);

interface RemoveCompanyOwnerInterface {
  userId: string;
  addEmployee: boolean;
  pricePerHour?: number;
  monthlyPrice?: number;
}

export const removeCompanyOwner = createAsyncThunk<void, RemoveCompanyOwnerInterface, baseStoreType>(
  'companyOwners/removeCompanyOwner',
  async ({ userId, addEmployee, pricePerHour, monthlyPrice }, { dispatch, getState }) => {
    try {
      const { token } = getState().auth.tokens;

      if (token) {
        await companyApi.post(
          '/company/owner',
          { toBeRemovedId: userId, addEmployee, pricePerHour, monthlyPrice },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        dispatch(getCompanyOwners());
        addEmployee && dispatch(getAllCompanyEmployees());
        dispatch(setNotificationMessage({ message: 'Usunięto administratora' }));
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    }
  }
);
