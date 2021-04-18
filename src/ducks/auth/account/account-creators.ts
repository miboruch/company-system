import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { getUserData } from '../data/data-creators';
import { baseStoreType } from 'store/store';
import { setNotificationMessage } from '../../popup/popup';
import { NotificationTypes } from 'types/globalTypes';

interface EditAccountInterface {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

export const editAccount = createAsyncThunk<void, EditAccountInterface, baseStoreType>('account/editAccount', async (values, { rejectWithValue, dispatch, getState }) => {
  const { token } = getState().auth.tokens;
  try {
    await authApi.put(`/user`, values, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(getUserData());

    dispatch(setNotificationMessage({ message: 'Edytowano dane' }));
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.statusText);
  }
});

interface EditPasswordInterface {
  password: string;
  repeatedPassword: string;
}

export const editPassword = createAsyncThunk<void, EditPasswordInterface, baseStoreType>('account/editPassword', async (values, { rejectWithValue, dispatch, getState }) => {
  const { token } = getState().auth.tokens;
  try {
    await authApi.put(
      `/user/password`,
      { values },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    dispatch(setNotificationMessage({ message: 'Zmieniono hasło' }));
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.statusText);
  }
});
