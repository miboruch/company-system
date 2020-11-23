import { NotificationTypes } from '../../types/actionTypes/toggleAcitonTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseStoreType } from '../../store/test-store';
import { adminApi } from '../../api';
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
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      await adminApi.post(`/client/create-client`, {
        values
      });

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
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      await adminApi.post(`/client/delete-client/${clientId}`);

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
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      const { data } = await adminApi.get(`/client/get-client-data/${clientId}`);

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
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      await adminApi.put(`/client/edit-client`, { values });

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
  const { currentCompany } = getState().company.currentCompany;

  try {
    if (token && currentCompany) {
      await adminApi.put(`/client/edit-client-coords`, { clientId, lat, long });

      dispatch(getSingleClient(clientId));
      dispatch(setNotificationMessage({ message: 'Zapisano koordynację' }));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: error.response.data, notificationType: NotificationTypes.Error }));
  }
});