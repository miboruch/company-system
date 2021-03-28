import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAuthModel, EmployeeModel } from 'types';
import { getUserData, getOwnEmployeeData } from './data-creators';

interface InitialStateInterface {
  userData: null | UserAuthModel;
  employeeData: null | EmployeeModel;
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
    builder.addCase(getUserData.fulfilled.type, (state, { payload }: PayloadAction<UserAuthModel>) => {
      state.userData = payload;
    });
    builder.addCase(getOwnEmployeeData.fulfilled.type, (state, { payload }: PayloadAction<EmployeeModel>) => {
      state.employeeData = payload;
    });
  }
});

export const { resetUserData } = authDataSlice.actions;

export default authDataSlice.reducer;
