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
  extraReducers: {
    [editAccount.pending.type]: (state) => {
      state.isEditAccountLoading = true;
    },
    [editAccount.fulfilled.type]: (state) => {
      state.isEditAccountLoading = false;
    },
    [editAccount.rejected.type]: (state) => {
      state.isEditAccountLoading = false;
    },
    [editPassword.pending.type]: (state) => {
      state.isEditAccountLoading = true;
    },
    [editPassword.fulfilled.type]: (state) => {
      state.isEditAccountLoading = false;
    },
    [editPassword.rejected.type]: (state) => {
      state.isEditAccountLoading = false;
    }
  }
});

export default accountSlice.reducer;
