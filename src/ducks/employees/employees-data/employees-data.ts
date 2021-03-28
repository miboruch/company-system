import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeModel } from 'types';
import {
  getAllCompanyEmployees,
  getEmployeeHours,
  getEmployeeSalary,
  AllCompanyEmployeesReturnInterface
} from './employees-data-creators';

interface InitialStateInterface {
  allCompanyEmployees: EmployeeModel[];
  areEmployeesLoading: boolean;
  employeesError: string | undefined;
  companyEmployeesCounter: number;
}

const initialState: InitialStateInterface = {
  allCompanyEmployees: [],
  areEmployeesLoading: false,
  employeesError: undefined,
  companyEmployeesCounter: 0
};

const employeesDataSlice = createSlice({
  name: 'employeesData',
  initialState,
  reducers: {
    resetEmployeesData: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCompanyEmployees.pending.type, (state) => {
      state.areEmployeesLoading = true;
      state.employeesError = undefined;
    });
    builder.addCase(
      getAllCompanyEmployees.fulfilled.type,
      (state, { payload }: PayloadAction<AllCompanyEmployeesReturnInterface>) => {
        state.areEmployeesLoading = false;
        state.allCompanyEmployees = payload.employees;
        state.companyEmployeesCounter = payload.employeesCounter;
      }
    );
    builder.addCase(getAllCompanyEmployees.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.areEmployeesLoading = false;
      state.employeesError = payload;
    });
    builder.addCase(getEmployeeHours.pending.type, (state) => {
      state.areEmployeesLoading = true;
    });
    builder.addCase(getEmployeeHours.fulfilled.type, (state) => {
      state.areEmployeesLoading = false;
    });
    builder.addCase(getEmployeeHours.rejected.type, (state) => {
      state.areEmployeesLoading = false;
    });
    builder.addCase(getEmployeeSalary.pending.type, (state) => {
      state.areEmployeesLoading = true;
    });
    builder.addCase(getEmployeeSalary.fulfilled.type, (state) => {
      state.areEmployeesLoading = false;
    });
    builder.addCase(getEmployeeSalary.rejected.type, (state) => {
      state.areEmployeesLoading = false;
    });
  }
});

export const { resetEmployeesData } = employeesDataSlice.actions;

export default employeesDataSlice.reducer;
