import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAuthData } from '../../../types/modelsTypes';
import { authApi } from '../../../api';
import { AppDispatch, AppState } from '../../../store/test-store';

export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

export const getUserData = createAsyncThunk<UserAuthData, void, { dispatch: AppDispatch; state: AppState }>('data/userData', async (_arg, { rejectWithValue }) => {
  try {
    const { data } = await authApi.get('/user/user-data');

    return data as UserAuthData;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

interface InitialStateInterface {
  userData: null | UserAuthData;
}

const initialState: InitialStateInterface = {
  userData: null
};

const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    resetUserData: (state) => {
      state.userData = null;
    }
  },
  extraReducers: {
    [getUserData.fulfilled.type]: (state, { payload }: PayloadAction<UserAuthData>) => {
      state.userData = payload;
    }
  }
});

export default authDataSlice.reducer;
