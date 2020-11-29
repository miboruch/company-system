import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateInvoice } from './invoice-creators';

interface InitialStateInterface {
  isInvoiceLoading: boolean;
  invoiceError: string | undefined;
}

const initialState: InitialStateInterface = {
  isInvoiceLoading: false,
  invoiceError: undefined
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generateInvoice.pending.type, (state) => {
      state.isInvoiceLoading = true;
      state.invoiceError = undefined;
    });
    builder.addCase(generateInvoice.fulfilled.type, (state) => {
      state.isInvoiceLoading = false;
    });
    builder.addCase(generateInvoice.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.isInvoiceLoading = false;
      state.invoiceError = payload;
    });
  }
});

export default invoiceSlice.reducer;
