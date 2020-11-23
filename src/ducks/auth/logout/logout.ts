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
  extraReducers: (builder) => {
    builder.addCase(logout.pending.type, (state) => {
      state.isLogoutLoading = true;
      state.logoutError = undefined;
    });
    builder.addCase(logout.fulfilled.type, (state) => {
      state.isLogoutLoading = false;
    });
    builder.addCase(logout.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.isLogoutLoading = false;
      state.logoutError = payload;
    });
  }
});

export default logoutSlice.reducer;
