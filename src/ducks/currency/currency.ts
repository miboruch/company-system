import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { CurrencyInterface } from '../../types/actionTypes/toggleAcitonTypes';
import { getCurrencyValue, CurrencyReturnInterface } from './currency-creators';

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
  reducers: {},
  extraReducers: {
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
