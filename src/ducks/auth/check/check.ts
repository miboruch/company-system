import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setTokens } from '../tokens/tokens';

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
    },
    resetCheckState: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(setTokens, (state, { payload }: PayloadAction<{ token: string; refreshToken: string; expireIn: number } | null>) => {
      state.isLoggedIn = !!payload;
    });
  }
});

export const { setLogged, setLoading, resetCheckState } = authCheckSlice.actions;

export default authCheckSlice.reducer;
