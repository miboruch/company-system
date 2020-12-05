import { RegistrationVerifyTokenResponse } from '../../../pages/RegisterFromLink/RegisterFromLink';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from '../../../store/test-store';
import { setTokens } from '../tokens/tokens';
import { api, companyApi } from '../../../api';
import { setNotificationMessage } from '../../popup/popup';
import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';

interface ValidateTokenInterface {
  token: string;
  setResponse: (response: RegistrationVerifyTokenResponse) => void;
}

export const validateRegistrationToken = createAsyncThunk<RegistrationVerifyTokenResponse, ValidateTokenInterface, baseStoreType>(
  'link-registration/validateRegistrationToken',
  async ({ token, setResponse }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/auth/verify-registration-token`, { token });

      setResponse(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  }
);

interface RegisterFromLinkInterface {
  token: string;
  password: string;
  repeatedPassword: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  callback: () => void;
}

export const registerFromLink = createAsyncThunk<void, RegisterFromLinkInterface, baseStoreType>(
  'link-registration/registerFromLink',
  async ({ callback, ...values }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post(`/auth/register-from-link`, { values });

      dispatch(setTokens({ token: data.token, refreshToken: data.refreshToken }));
      dispatch(setNotificationMessage({ message: 'Utworzono nowe konto' }));
      callback();
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
      return rejectWithValue(error.response.statusText);
    }
  }
);

interface SendRegistrationMailInterface {
  email: string;
  pricePerHour?: number;
  monthlyPrice?: number;
}
export const sendRegistrationMail = createAsyncThunk<void, SendRegistrationMailInterface, baseStoreType>(
  'link-registration/sendRegistrationMail',
  async ({ email, monthlyPrice, pricePerHour }, { dispatch, getState }) => {
    try {
      const { currentCompany } = getState().company.currentCompany;
      const { token } = getState().auth.tokens;

      if (token && currentCompany) {
        const body = {
          email,
          pricePerHour,
          monthlyPrice,
          companyName: currentCompany.name
        };
        await companyApi.post(
          `/auth/send-registration-link`,
          { body },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        dispatch(setNotificationMessage({ message: 'Wysłano wiadomość na email' }));
      }
    } catch (error) {
      dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    }
  }
);
