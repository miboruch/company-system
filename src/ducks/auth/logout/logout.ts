import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { setTokens } from '../tokens/tokens';

export const userLogout = createAsyncThunk('logout/userLogout', async (callback: () => void, { rejectWithValue, dispatch, getState }) => {
  try {
    // const {refreshToken}
    await api.post(`/auth/logout`);

    dispatch(setTokens(null));
    callback();
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

interface InitialStateInterface {
  isLogoutLoading: boolean;
  logoutError: string | undefined;
}

const initialState: InitialStateInterface = {
  isLogoutLoading: false,
  logoutError: undefined
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: {
    [userLogout.pending.type]: (state) => {
      state.isLogoutLoading = true;
      state.logoutError = undefined;
    },
    [userLogout.fulfilled.type]: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expireDate');

      state.isLogoutLoading = false;
    },
    [userLogout.rejected.type]: (state, { payload }: PayloadAction<string | undefined>) => {
      state.isLogoutLoading = false;
      state.logoutError = payload;
    }
  }
});

export default logoutSlice.reducer;
