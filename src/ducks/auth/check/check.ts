import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { getUserData } from '../data/data';
import { logout } from '../logout/logout';
import { getNewAccessToken, setTokens } from '../tokens/tokens';
import { AppDispatch, AppState } from '../../../store/test-store';

interface AuthTimeoutInterface {
  refreshToken: string;
  expireMilliseconds: number;
}

export const authTimeout = createAsyncThunk<ReturnType<typeof setTimeout>, AuthTimeoutInterface, { dispatch: AppDispatch; state: AppState }>(
  'check/authTimeout',
  async ({ refreshToken, expireMilliseconds }, { dispatch }) => {
    return setTimeout(async () => {
      dispatch(getNewAccessToken({ refreshToken }));
    }, expireMilliseconds);
  }
);

interface AuthCheckInterface {
  successCallback: () => void;
  errorCallback: () => void;
}
export const authCheck = createAsyncThunk<void, AuthCheckInterface, { dispatch: AppDispatch; state: AppState }>(
  'check/authCheck',
  async ({ successCallback, errorCallback }: AuthCheckInterface, { dispatch }) => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    const expireDate = localStorage.getItem('expireDate');

    if (token && refreshToken && expireDate) {
      dispatch(setLoading(true));
      const expDate = new Date(expireDate);
      if (expDate <= new Date()) {
        //get new access token
      } else {
        dispatch(setTokens({ token, refreshToken, expireIn: new Date(expireDate).getTime() }));
        // dispatch(getUserData(token));
        dispatch(authTimeout({ refreshToken, expireMilliseconds: expDate.getTime() - new Date().getTime() }));
        successCallback();
      }
    } else {
      if (refreshToken) {
        dispatch(logout(() => console.log('sign out')));
        dispatch(setLoading(false));
        //auth logout
      } else {
        //resetState full state
        dispatch(setLoading(false));
        errorCallback();
      }
    }
  }
);

interface InitialStateInterface {
  isLoading: boolean;
  isLoggedIn: boolean;
}

const initialState: InitialStateInterface = {
  isLoading: false,
  isLoggedIn: false
};

const authCheckSlice = createSlice({
  name: 'authCheck',
  initialState,
  reducers: {
    setLogged: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggedIn = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    }
  }
});

export const { setLogged, setLoading } = authCheckSlice.actions;

export default authCheckSlice.reducer;
