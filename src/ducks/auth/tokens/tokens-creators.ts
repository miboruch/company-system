import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '../../../store/test-store';
import { api } from '../../../api';
import { getUserData } from '../data/data-creators';
import { authTimeout } from '../check/check-creators';
import { logout } from '../logout/logout-creators';
import { setTokens } from './tokens';

interface GetNewAccessTokenInterface {
  refreshToken: string;
  successCallback?: () => void;
  errorCallback?: () => void;
}

export const getNewAccessToken = createAsyncThunk<any, GetNewAccessTokenInterface, { dispatch: AppDispatch; state: AppState }>(
  'tokens/getNewAccessToken',
  async ({ refreshToken, successCallback, errorCallback }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.post(`/auth/token`, { refreshToken });

      dispatch(setTokens({ token: data.accessToken, refreshToken, expireIn: data.expireIn }));
      dispatch(getUserData());

      dispatch(authTimeout({ refreshToken, expireMilliseconds: data.expireIn - new Date().getTime() }));
      !!successCallback && successCallback();
      return data;
    } catch (error) {
      !!errorCallback && errorCallback();
      dispatch(logout(() => console.log('sign out')));
      return rejectWithValue(error.response.statusText);
    }
  }
);
