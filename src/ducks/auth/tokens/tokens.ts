import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateInterface {
  token: string | null;
  refreshToken: string | null;
}

const initialState: InitialStateInterface = {
  token: null,
  refreshToken: null
};

const tokenSlice = createSlice({
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
    },
    resetTokens: () => initialState
  }
});

export const { setTokens, resetTokens } = tokenSlice.actions;

export default tokenSlice.reducer;
