import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAuthData } from '../../../types/modelsTypes';
import { getUserData } from '../data/data';
import { userLogout } from '../logout/logout';
import { getNewAccessToken, setTokens } from '../tokens/tokens';

interface AuthTimeoutInterface {
  refreshToken: string;
  expireMilliseconds: number;
}

export const authTimeout = createAsyncThunk('check/authTimeout', async ({ refreshToken, expireMilliseconds }: AuthTimeoutInterface, { dispatch }) => {
  return setTimeout(async () => {
    dispatch(getNewAccessToken({ refreshToken }));
  }, expireMilliseconds);
});

interface AuthCheckInterface {
  successCallback: () => void;
  errorCallback: () => void;
}
export const authCheck = createAsyncThunk('check/authCheck', async ({ successCallback, errorCallback }: AuthCheckInterface, { dispatch }) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const expireDate = localStorage.getItem('expireDate');

  if (token && refreshToken && expireDate) {
    //set loading true
    const expDate = new Date(expireDate);
    if (expDate <= new Date()) {
      //get new access token
    } else {
      dispatch(setTokens({ token, refreshToken, expireIn: new Date(expireDate).getTime() }));
      dispatch(getUserData(token));
      dispatch(authTimeout({ refreshToken, expireMilliseconds: expDate.getTime() - new Date().getTime() }));
      successCallback();
    }
  } else {
    if (refreshToken) {
      dispatch(userLogout(errorCallback));
      //auth logout
    } else {
      //resetState full state
      errorCallback();
    }
  }
});

interface InitialStateInterface {
  isLoading: boolean;
  error: string | undefined;
}

const initialState: InitialStateInterface = {
  isLoading: false,
  error: undefined
};

const authCheckSlice = createSlice({
  name: 'authCheck',
  initialState,
  reducers: {}
});

export default authCheckSlice.reducer;
