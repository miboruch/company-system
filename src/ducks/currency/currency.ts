import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyModel } from 'types';
import { getCurrencyValue, CurrencyReturnInterface } from './currency-creators';

interface InitialStateInterface {
  isCurrencyLoading: boolean;
  currency: CurrencyModel;
}

const initialState: InitialStateInterface = {
  isCurrencyLoading: false,
  currency: {
    name: 'PLN',
    value: 1
  }
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrencyValue.pending.type, (state) => {
      state.isCurrencyLoading = true;
    });
    builder.addCase(getCurrencyValue.fulfilled.type, (state, { payload }: PayloadAction<CurrencyReturnInterface>) => {
      state.isCurrencyLoading = false;
      state.currency = {
        name: payload.name,
        value: payload.rate
      };
    });
    builder.addCase(getCurrencyValue.rejected.type, (state) => {
      state.isCurrencyLoading = false;
    });
  }
});

export default currencySlice.reducer;
