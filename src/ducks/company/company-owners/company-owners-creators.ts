import { createAsyncThunk } from '@reduxjs/toolkit';
import { CompanyOwnersInterface } from '../../../types/modelsTypes';
import { baseStoreType } from '../../../store/store';
import { companyApi } from '../../../api';
import { setNotificationMessage } from '../../popup/popup';
import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';
import { getAllCompanyEmployees } from '../../employees/employees-data/employees-data-creators';

export const getCompanyOwners = createAsyncThunk<CompanyOwnersInterface[], void, baseStoreType>('companyOwners/getCompanyOwners', async (_arg, { dispatch, rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth.tokens;

    if (token) {
      const { data } = await companyApi.get('/company/get-company-owners', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data.owners as CompanyOwnersInterface[];
    } else {
      return [] as CompanyOwnersInterface[];
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.data);
  }
});

export const addNewCompanyOwner = createAsyncThunk<void, string, baseStoreType>('companyOwners/addNewCompanyOwner', async (userId, { dispatch, getState }) => {
  try {
    const { token } = getState().auth.tokens;

    if (token) {
      await companyApi.post(
        '/company/add-company-owner',
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
});

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
          '/company/remove-company-owner',
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
