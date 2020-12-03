import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setTokens } from '../auth/tokens/tokens';

interface InitialStateInterface {
  isLoading: boolean;
}

const initialState: InitialStateInterface = {
  isLoading: true
};

const initialLoadSlice = createSlice({
  name: 'initialLoad',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setTokens, (state, { payload }: PayloadAction<{ token: string; refreshToken: string } | null>) => {
      state.isLoading = false;
    });
  }
});

export const { setLoading } = initialLoadSlice.actions;

export default initialLoadSlice.reducer;
