import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

interface InitialStateInterface {
  isLoading: boolean;
  isLoggedIn: boolean;
}

const initialState: InitialStateInterface = {
  isLoading: false,
  isLoggedIn: false
};

const authCheckSlice: Slice = createSlice({
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
  }
});

export const { setLogged, setLoading, resetCheckState } = authCheckSlice.actions;

export default authCheckSlice.reducer;
