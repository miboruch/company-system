import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAuthData } from '../../../types/modelsTypes';
import { getUserData } from './data-creators';

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
