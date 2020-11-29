import { saveAs } from 'file-saver';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { authApi } from '../../api';
import { setNotificationMessage } from '../popup/popup';
import { ItemInterface } from '../../components/organisms/GenerateInvoice/GenerateInvoice';
import { baseStoreType } from '../../store/test-store';
import { NotificationTypes } from '../../types/actionTypes/toggleAcitonTypes';

export interface InvoiceInterface {
  name: string;
  address: string;
  city: string;
  country: string;
  items: ItemInterface[];
}

export const generateInvoice = createAsyncThunk<void, InvoiceInterface, baseStoreType>('invoice/generateInvoice', async (values, { rejectWithValue, getState, dispatch }) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      const { data } = await authApi.post(
        `/invoice/create-invoice`,
        { ...values },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const base64pdf = `data:application/pdf;base64,${data}`;
      saveAs(base64pdf, `faktura-${new Date().getTime()}.pdf`);

      dispatch(setNotificationMessage({ message: 'Utworzono fakturę' }));
    }
  } catch (error) {
    dispatch(setNotificationMessage({ message: 'Problem z utworzeniem faktury', notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.data);
  }
});
