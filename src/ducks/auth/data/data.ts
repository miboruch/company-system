import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeDataInterface, UserAuthData } from '../../../types/modelsTypes';
import { getUserData, getOwnEmployeeData } from './data-creators';

interface InitialStateInterface {
  userData: null | UserAuthData;
  employeeData: null | EmployeeDataInterface;
}

const initialState: InitialStateInterface = {
  userData: null,
  employeeData: null
};

const authDataSlice = createSlice({
  name: 'authData',
  initialState,
  reducers: {
    resetData: () => initialState,
    resetUserData: (state) => {
      state.userData = null;
    },
    resetEmployeeData: (state) => {
      state.employeeData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled.type, (state, { payload }: PayloadAction<UserAuthData>) => {
      state.userData = payload;
    });
    builder.addCase(getOwnEmployeeData.fulfilled.type, (state, { payload }: PayloadAction<EmployeeDataInterface>) => {
      state.employeeData = payload;
    });
  }
});

export const { resetUserData } = authDataSlice.actions;

export default authDataSlice.reducer;
