import { setCompany } from './current-company';
import { CompanyInterface } from '../../../types/modelsTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState, baseStoreType } from '../../../store/store';
import { companyApi } from '../../../api';
import { setNotificationMessage } from '../../popup/popup';
import { NotificationTypes } from '../../../types/globalTypes';
import { getCompanyAccessToken } from '../../auth/tokens/tokens-creators';
import { getOwnEmployeeData } from '../../auth/data/data-creators';

export const setCurrentCompany = (company: CompanyInterface | null, successCallback?: () => void) => (dispatch: AppDispatch, getState: () => AppState) => {
  const { refreshToken } = getState().auth.tokens;

  if (refreshToken && company) {
    dispatch(
      getCompanyAccessToken({
        refreshToken,
        companyId: company._id,
        successCallback: () => {
          !!successCallback && successCallback();
          localStorage.setItem('companyId', company._id);
        }
      })
    );
  } else {
    company && dispatch(getOwnEmployeeData(company._id));
    !!successCallback && successCallback();
  }

  dispatch(setCompany(company));
};

export const getSingleCompany = createAsyncThunk<void, string, baseStoreType>('currentCompany/getSingleCompany', async (companyId, { dispatch, getState }) => {
  try {
    const { token } = getState().auth.tokens;
    if (token) {
      const { data } = await companyApi.get(`/company/get-company-info/${companyId}`, {
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
      await companyApi.put(`/company/edit-company`, values, {
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
      await companyApi.put(
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
      await companyApi.put(`/company/remove-company`, {
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
