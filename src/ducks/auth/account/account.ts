import { createSlice, Slice } from '@reduxjs/toolkit';
import { editAccount, editPassword } from './account-creators';

interface InitialStateInterface {
  isEditAccountLoading: boolean;
}

const initialState: InitialStateInterface = {
  isEditAccountLoading: false
};

const accountSlice: Slice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(editAccount.pending.type, state => {
      state.isEditAccountLoading = true;
    });
    builder.addCase(editAccount.fulfilled.type, state => {
      state.isEditAccountLoading = false;
    });
    builder.addCase(editAccount.rejected.type, state => {
      state.isEditAccountLoading = false;
    });
    builder.addCase(editPassword.pending.type, state => {
      state.isEditAccountLoading = true;
    });
    builder.addCase(editPassword.fulfilled.type, state => {
      state.isEditAccountLoading = false;
    });
    builder.addCase(editPassword.rejected.type, state => {
      state.isEditAccountLoading = false;
    });
  }
});

export default accountSlice.reducer;
