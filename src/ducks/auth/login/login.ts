import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserData } from '../data/data';
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
  extraReducers: {
    [login.pending.type]: (state) => {
      state.isLoginLoading = true;
      state.loginError = undefined;
    },
    [login.fulfilled.type]: (state) => {
      state.isLoginLoading = false;
    },
    [login.rejected.type]: (state, { payload }: PayloadAction<string | undefined>) => {
      state.isLoginLoading = false;
      state.loginError = payload;
    }
  }
});

export default loginSlice.reducer;
