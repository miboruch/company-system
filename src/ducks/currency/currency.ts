import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { CurrencyInterface, NotificationTypes } from '../../types/actionTypes/toggleAcitonTypes';
import axios from 'axios';
import { CURRENCY_API_URL } from '../../utils/config';
import { setNotificationMessage } from '../popup/popup';
import { baseStoreType } from '../../store/test-store';

type currencyTypes = 'PLN' | 'EUR' | 'USD';

interface CurrencyReturnInterface {
  rate: number;
  name: currencyTypes;
}

//should be CurrencyReturnInterface instead of any
export const getCurrencyValue = createAsyncThunk<CurrencyReturnInterface, currencyTypes, baseStoreType>('currency/getCurrencyValue', async (currencyName, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${CURRENCY_API_URL}/latest?base=PLN&symbols=${currencyName}`);

    return {
      rate: data.rates[currencyName],
      name: currencyName
    } as CurrencyReturnInterface;
  } catch (error) {
    dispatch(setNotificationMessage({ message: 'Problem z pobraniem walut', notificationType: NotificationTypes.Error }));
    return rejectWithValue(error.response.data);
  }
});

interface InitialStateInterface {
  isCurrencyLoading: boolean;
  currency: CurrencyInterface;
}

const initialState: InitialStateInterface = {
  isCurrencyLoading: false,
  currency: {
    name: 'PLN',
    value: 1
  }
};

const currencySlice: Slice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    [getCurrencyValue.pending.type]: (state) => {
      state.isCurrencyLoading = true;
    },
    [getCurrencyValue.fulfilled.type]: (state, { payload }: PayloadAction<CurrencyReturnInterface>) => {
      state.isCurrencyLoading = false;
      state.currency = {
        name: payload.name,
        value: payload.rate
      };
    },
    [getCurrencyValue.rejected.type]: (state) => {
      state.isCurrencyLoading = false;
    }
  }
});

export default currencySlice.reducer;
