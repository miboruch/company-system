import { createAsyncThunk, createSlice, Dispatch, PayloadAction, Slice } from '@reduxjs/toolkit';
import { api } from '../../../api';
import { setTokens } from '../tokens/tokens';
import { AppDispatch, AppState } from '../../../store/test-store';

export const clearStorage = () => (dispatch: Dispatch<any>): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expireDate');

  dispatch(setTokens(null));
  //TODO: dispatch set isLoggedIn to false
};

export const logout = createAsyncThunk<void, () => void, { dispatch: AppDispatch; state: AppState }>('logout/userLogout', async (callback , { rejectWithValue, dispatch, getState }) => {
  try {
    const { refreshToken } = getState().auth.tokens;
    await api.post(`/auth/logout`, { refreshToken });

    dispatch(clearStorage());
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
