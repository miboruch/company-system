import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { login } from './login-creators';

interface InitialStateInterface {
  isLoginLoading: boolean;
  loginError: string | undefined;
}

const initialState: InitialStateInterface = {
  isLoginLoading: false,
  loginError: undefined
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase(login.pending.type, (state) => {
  //     state.isLoginLoading = true;
  //     state.loginError = undefined;
  //   });
  //   builder.addCase(login.fulfilled.type, (state) => {
  //     state.isLoginLoading = false;
  //   });
  //   builder.addCase(login.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
  //     state.isLoginLoading = false;
  //     state.loginError = payload;
  //   });
  // }
});

export default loginSlice.reducer;
