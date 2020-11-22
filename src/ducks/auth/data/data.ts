import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { UserAuthData } from '../../../types/modelsTypes';
import { getUserData } from './data-creators';

interface InitialStateInterface {
  userData: null | UserAuthData;
}

const initialState: InitialStateInterface = {
  userData: null
};

const authDataSlice: Slice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    resetUserData: () => initialState
  },
  extraReducers: {
    [getUserData.fulfilled.type]: (state, { payload }: PayloadAction<UserAuthData>) => {
      state.userData = payload;
    }
  }
});

export const { resetUserData } = authDataSlice.actions;

export default authDataSlice.reducer;
