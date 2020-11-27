import { Dispatch } from 'redux';
import { setCompany } from './current-company';
import { CompanyInterface } from '../../../types/modelsTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from '../../../store/test-store';
import { adminApi, authApi } from '../../../api';
import { setNotificationMessage } from '../../popup/popup';
import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';

export const setCurrentCompany = (company: CompanyInterface | null, successCallback?: () => void) => async (dispatch: Dispatch<any>) => {
  //if role is admin, generate set new admin token with companyId
  dispatch(setCompany(company));
  !!successCallback && successCallback();
};

export const getSingleCompany = createAsyncThunk<void, string, baseStoreType>('currentCompany/getSingleCompany', async (companyId, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    const { data } = await authApi.get(`/company/get-company-info/${companyId}`);

    await dispatch(setCurrentCompany(data));
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
      await adminApi.put(`/company/edit-company`, values);

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
      await adminApi.put(`/company/edit-company-coords`, { lat, long });

      dispatch(getSingleCompany(currentCompany._id));
      dispatch(setNotificationMessage({ message: 'Zapisano koordynację' }));
    }
  } catch (error) {
    console.log(error);
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});
