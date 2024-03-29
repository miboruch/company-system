import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { setTokens } from '../tokens/tokens';
import { setLogged } from '../check/check';
import { AppDispatch, AppState } from 'store/store';
import { api } from 'api';
import { resetState } from '../../reset/reset-creators';

export const clearStorage = () => (dispatch: Dispatch<any>): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expireDate');
  localStorage.removeItem('companyId');

  dispatch(setTokens(null));
  dispatch(setLogged(false));
};

export const logout = createAsyncThunk<void, () => void, { dispatch: AppDispatch; state: AppState }>('logout/userLogout', async (callback, { rejectWithValue, dispatch, getState }) => {
  try {
    const { refreshToken } = getState().auth.tokens;
    await api.post(`/auth/logout`, { refreshToken });

    dispatch(clearStorage());
    dispatch(resetState());
    callback();
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});
