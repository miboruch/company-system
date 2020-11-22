import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    }
  }
});

export const { setLogged, setLoading } = authCheckSlice.actions;

export default authCheckSlice.reducer;
