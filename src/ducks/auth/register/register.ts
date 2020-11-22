import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { api } from '../../../api';
import {setTokens} from '../tokens/tokens';

interface RegisterInterface {
  email: string;
  password: string;
  repeatedPassword: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  callback: () => void;
}

export const userRegister = createAsyncThunk('register/userRegister', async ({ callback, ...values }: RegisterInterface, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await api.post(`/auth/register`, values);

    //TODO: dispatch actions
    dispatch(setTokens({ token: data.token, refreshToken: data.refreshToken, expireIn: data.expireIn }));
    // dispatch(getUserData(data.token));
    callback();
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

interface InitialStateInterface {
  isRegisterLoading: boolean;
  registerError: string | undefined;
}

const initialState: InitialStateInterface = {
  isRegisterLoading: false,
  registerError: undefined
};

const registerSlice: Slice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: {
    [userRegister.pending.type]: (state) => {
      state.isRegisterLoading = true;
      state.registerError = undefined;
    },
    [userRegister.fulfilled.type]: (state) => {
      state.isRegisterLoading = false;
    },
    [userRegister.rejected.type]: (state, { payload }: PayloadAction<string | undefined>) => {
      state.isRegisterLoading = false;
      state.registerError = payload;
    }
  }
});

export default registerSlice.reducer;
