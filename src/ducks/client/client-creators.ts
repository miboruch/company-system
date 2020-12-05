import { NotificationTypes } from '../../types/globalTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from '../../store/store';
import { companyApi } from '../../api';
import { getSingleDayAttendance } from '../attendance/attendance-data/attendance-data-creators';
import { getCompanyClients } from './client-data/client-data-creators';
import { setClientInfoOpen, setSelectedClient } from './client-toggle/client-toggle';
import { setNotificationMessage } from '../popup/popup';

interface AddClientInterface {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
  lat: number;
  long: number;
}

export const addNewClient = createAsyncThunk<void, AddClientInterface, baseStoreType>('client/addNewClient', async (values, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      await companyApi.post(
        `/client/create-client`,
        {
          ...values
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(getCompanyClients());
      dispatch(setClientInfoOpen(false));
      dispatch(setNotificationMessage({ message: 'Dodano klienta' }));
      dispatch(getSingleDayAttendance());
    } else {
      dispatch(setNotificationMessage({ message: 'Brak uwierzytelnienia', notificationType: NotificationTypes.Error }));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});

export const deleteClient = createAsyncThunk<void, string, baseStoreType>('client/deleteClient', async (clientId, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      await companyApi.post(`/client/delete-client/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(getCompanyClients());
      dispatch(setClientInfoOpen(false));
      dispatch(setSelectedClient(null));
      dispatch(setNotificationMessage({ message: 'Usunięto klienta' }));
      dispatch(getSingleDayAttendance());
    } else {
      dispatch(setNotificationMessage({ message: 'Brak uwierzytelnienia', notificationType: NotificationTypes.Error }));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});

export const getSingleClient = createAsyncThunk<void, string, baseStoreType>('client/getSingleClient', async (clientId, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      const { data } = await companyApi.get(`/client/get-client-data/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setSelectedClient(data));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});

interface EditClientInterface {
  clientId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

export const editClient = createAsyncThunk<void, EditClientInterface, baseStoreType>('client/editClient', async (values, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      await companyApi.put(
        `/client/edit-client`,
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // - setSelectedClient
      // + getSingleClient
      // dispatch(getSingleClient(values.clientId));
      dispatch(setSelectedClient(null));
      dispatch(getCompanyClients());
      dispatch(setNotificationMessage({ message: 'Edytowano klienta' }));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});

interface EditClientCoorsInterface {
  clientId: string;
  lat: number;
  long: number;
}

export const editClientCoords = createAsyncThunk<void, EditClientCoorsInterface, baseStoreType>('client/editClientCoords', async ({ clientId, lat, long }, { dispatch, getState }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      await companyApi.put(
        `/client/edit-client-coords`,
        { clientId, lat, long },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(getSingleClient(clientId));
      dispatch(setNotificationMessage({ message: 'Zapisano koordynację' }));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});
