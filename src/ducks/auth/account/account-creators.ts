import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../../api';
import { getUserData } from '../data/data-creators';
import { baseStoreType } from '../../../store/test-store';
import { setNotificationMessage } from '../../popup/popup';
import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';

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

export const editAccount = createAsyncThunk<void, EditAccountInterface, baseStoreType>('account/editAccount', async (values, { rejectWithValue, dispatch }) => {
  try {
    await authApi.put(`/user/edit-user`, values);

    dispatch(getUserData());
    //TODO: notifications
    dispatch(setNotificationMessage({ message: 'Edytowano konto' }));
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.statusText);
  }
});

interface EditPasswordInterface {
  password: string;
  repeatedPassword: string;
}

export const editPassword = createAsyncThunk<void, EditPasswordInterface, baseStoreType>('account/editPassword', async (values, { rejectWithValue, dispatch }) => {
  try {
    await authApi.put(`/user/password-edit`, { values });

    dispatch(setNotificationMessage({ message: 'Edytowano hasło' }));
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.statusText);
  }
});
