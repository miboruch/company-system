import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setNotification } from 'ducks/popup/popup';
import { baseStoreType } from 'store/store';
import { CURRENCY_API_URL } from 'utils/config';

export type currencyTypes = 'PLN' | 'EUR' | 'USD';

export interface CurrencyReturnInterface {
  rate: number;
  name: currencyTypes;
}

export const getCurrencyValue = createAsyncThunk<CurrencyReturnInterface, currencyTypes, baseStoreType>(
  'currency/getCurrencyValue',
  async (currencyName, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${CURRENCY_API_URL}/latest?base=PLN&symbols=${currencyName}`);

      return {
        rate: data.rates[currencyName],
        name: currencyName
      } as CurrencyReturnInterface;
    } catch (error) {
      dispatch(setNotification({ message: error.response.data }));
      return rejectWithValue(error.response.data);
    }
  }
);
