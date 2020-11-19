import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { getUserData, setIsLoggedIn } from '../data/data';
import {setTokens} from '../tokens/tokens';
import { authTimeout } from '../check/check';

interface LoginInterface {
  email: string;
  password: string;
  callback: () => void;
}

export const userLogin = createAsyncThunk('login/userLogin', async ({ email, password, callback }: LoginInterface, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await api.post(`/auth/login`, { email, password });

    //TODO: dispatch actions
    dispatch(setTokens({ token: data.token, refreshToken: data.refreshToken, expireIn: data.expireIn }));
    dispatch(getUserData(data.token));

    const milliseconds = data.expireIn - new Date().getTime();
    dispatch(setIsLoggedIn(true));
    dispatch(authTimeout({refreshToken: data.refreshToken, expireMilliseconds: milliseconds}));
    callback();
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

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
    [userLogin.pending.type]: (state) => {
      state.isLoginLoading = true;
      state.loginError = undefined;
    },
    [userLogin.fulfilled.type]: (state) => {
      state.isLoginLoading = false;
    },
    [userLogin.rejected.type]: (state, { payload }: PayloadAction<string | undefined>) => {
      state.isLoginLoading = false;
      state.loginError = payload;
    }
  }
});

export default loginSlice.reducer;
