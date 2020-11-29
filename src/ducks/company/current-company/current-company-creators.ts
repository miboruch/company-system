import { Dispatch } from 'redux';
import { setCompany } from './current-company';
import { CompanyInterface } from '../../../types/modelsTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState, baseStoreType } from '../../../store/test-store';
import { authApi } from '../../../api';
import { setNotificationMessage } from '../../popup/popup';
import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';
import { UserRole } from '../../auth/roles/roles';
import { getAdminAccessToken } from '../../auth/tokens/tokens-creators';

export const setCurrentCompany = (company: CompanyInterface | null, successCallback?: () => void) => (dispatch: AppDispatch, getState: () => AppState) => {
  //if role is admin, generate set new admin token with companyId
  const { role } = getState().auth.roles;
  const { refreshToken } = getState().auth.tokens;

  if (role === UserRole.Admin && refreshToken && company) {
    dispatch(getAdminAccessToken({ refreshToken, companyId: company._id, successCallback: () => !!successCallback && successCallback() }));
  } else {
    !!successCallback && successCallback();
  }

  dispatch(setCompany(company));
};

export const getSingleCompany = createAsyncThunk<void, string, baseStoreType>('currentCompany/getSingleCompany', async (companyId, { dispatch, getState }) => {
  try {
    const { token } = getState().auth.tokens;
    if (token) {
      const { data } = await authApi.get(`/company/get-company-info/${companyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await dispatch(setCurrentCompany(data));
    }
  } catch (error) {
    console.log(error);
  }
});

interface EditCompanyInterface {
  name: string;
  email: string;
  nip: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

export const editCompany = createAsyncThunk<void, EditCompanyInterface, baseStoreType>('currentCompany/editCompany', async (values, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      await authApi.put(`/company/edit-company`, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(getSingleCompany(currentCompany._id));
      dispatch(setNotificationMessage({ message: 'Edytowano firmę' }));
    }
  } catch (error) {
    console.log(error);
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});

export const editCompanyCoords = createAsyncThunk<void, { lat: number; long: number }, baseStoreType>('currentCompany/editCompanyCoords', async ({ lat, long }, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      await authApi.put(
        `/company/edit-company-coords`,
        { lat, long },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(getSingleCompany(currentCompany._id));
      dispatch(setNotificationMessage({ message: 'Zapisano koordynację' }));
    }
  } catch (error) {
    console.log(error);
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});

export const deleteCompany = createAsyncThunk<void, () => void, baseStoreType>('currentCompany/deleteCompany', async (callback, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      await authApi.put(`/company/remove-company`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      callback();
      dispatch(setNotificationMessage({ message: 'Usunięto firmę' }));
    }
  } catch (error) {
    console.log(error);
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});
