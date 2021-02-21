import { saveAs } from 'file-saver';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { companyApi } from 'api';
import { setNotificationMessage } from '../popup/popup';
import { InvoiceItem } from 'types';
import { baseStoreType } from 'store/store';
import { NotificationTypes } from 'types/globalTypes';

export interface InvoiceInterface {
  name: string;
  address: string;
  city: string;
  country: string;
  items: InvoiceItem[];
}

export const generateInvoice = createAsyncThunk<void, InvoiceInterface, baseStoreType>(
  'invoice/generateInvoice',
  async (values, { rejectWithValue, getState, dispatch }) => {
    const { token } = getState().auth.tokens;

    try {
      if (token) {
        const { data } = await companyApi.post(
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
  }
);
