import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAuthData } from '../../../types/modelsTypes';
import { authApi } from '../../../api';

export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

export const getUserData = createAsyncThunk('data/userData', async (token: string, { rejectWithValue }) => {
  try {
    const { data } = await authApi.get('/user/user-data');

    return data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

interface InitialStateInterface {
  userData: null | UserAuthData;
  role: UserRole;
  isLoggedIn: boolean;
}

const initialState: InitialStateInterface = {
  userData: null,
  role: UserRole.User,
  isLoggedIn: false
};

const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    setUserRole: (state, { payload }: PayloadAction<UserRole>) => {
      state.role = payload;
    },
    setIsLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggedIn = payload;
    }
  },
  extraReducers: {
    [getUserData.fulfilled.type]: (state, { payload }: PayloadAction<UserAuthData | null>) => {
      state.userData = payload;
    }
  }
});

export const { setUserRole, setIsLoggedIn } = authDataSlice.actions;

export default authDataSlice.reducer;
