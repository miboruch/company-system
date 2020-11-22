import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { logout } from './logout-creators';

interface InitialStateInterface {
  isLogoutLoading: boolean;
  logoutError: string | undefined;
}

const initialState: InitialStateInterface = {
  isLogoutLoading: false,
  logoutError: undefined
};

const logoutSlice: Slice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: {
    [logout.pending.type]: (state) => {
      state.isLogoutLoading = true;
      state.logoutError = undefined;
    },
    [logout.fulfilled.type]: (state) => {
      state.isLogoutLoading = false;
    },
    [logout.rejected.type]: (state, { payload }: PayloadAction<string | undefined>) => {
      state.isLogoutLoading = false;
      state.logoutError = payload;
    }
  }
});

export default logoutSlice.reducer;
