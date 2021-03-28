import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeModel } from 'types';

interface InitialStateInterface {
  selectedEmployee: EmployeeModel | null;
  isEmployeeInfoOpen: boolean;
  isAddNewOpen: boolean;
  isEditEmployeeOpen: boolean;
}

const initialState: InitialStateInterface = {
  selectedEmployee: null,
  isEmployeeInfoOpen: false,
  isAddNewOpen: false,
  isEditEmployeeOpen: false
};

const employeesToggleSlice = createSlice({
  name: 'employeesToggle',
  initialState,
  reducers: {
    setSelectedEmployee: (state, { payload }: PayloadAction<EmployeeModel | null>) => {
      state.selectedEmployee = payload;
    },
    setEmployeeInfoOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isEmployeeInfoOpen = payload;
    },
    setAddNewEmployeeOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isAddNewOpen = payload;
    },
    setIsEditEmployeeOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isEditEmployeeOpen = payload;
    },
    resetEmployeesToggle: () => initialState
  }
});

export const {
  setSelectedEmployee,
  setEmployeeInfoOpen,
  setAddNewEmployeeOpen,
  setIsEditEmployeeOpen,
  resetEmployeesToggle
} = employeesToggleSlice.actions;

export default employeesToggleSlice.reducer;
