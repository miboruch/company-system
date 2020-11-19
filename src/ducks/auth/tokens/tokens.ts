import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { getUserData } from '../../../actions/authenticationActions';
import { authTimeout } from '../check/check';
import { userLogout } from '../logout/logout';

interface GetNewAccessTokenInterface {
  refreshToken: string;
  successCallback?: () => void;
  errorCallback?: () => void;
}

export const getNewAccessToken = createAsyncThunk(
  'tokens/getNewAccessToken',
  async ({ refreshToken, successCallback, errorCallback }: GetNewAccessTokenInterface, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await api.post(`/auth/token`, { refreshToken });

      dispatch(setTokens({ token: data.accessToken, refreshToken, expireIn: data.expireIn }));
      dispatch(getUserData(data.accessToken));

      dispatch(authTimeout({ refreshToken, expireMilliseconds: data.expireIn - new Date().getTime() }));
      !!successCallback && successCallback();
      return data;
    } catch (error) {
      !!errorCallback && errorCallback();
      dispatch(userLogout(() => console.log('sign out')));
      return rejectWithValue(error.response.statusText);
    }
  }
);

interface InitialStateInterface {
  token: string | null;
  refreshToken: string | null;
}

const initialState: InitialStateInterface = {
  token: null,
  refreshToken: null
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, { payload }: PayloadAction<{ token: string; refreshToken: string; expireIn: number } | null>) => {
      if (payload) {
        localStorage.setItem('token', payload.token);
        localStorage.setItem('refreshToken', payload.refreshToken);
        localStorage.setItem('expireDate', new Date(payload.expireIn).toString());

        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
      } else {
        state.token = null;
        state.refreshToken = null;
      }
    }
  }
});

export const { setTokens } = tokensSlice.actions;

export default tokensSlice.reducer;
