import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmployeeDataInterface } from '../../../types/modelsTypes';

interface InitialStateInterface {
  selectedEmployee: EmployeeDataInterface | null;
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
    setSelectedEmployee: (state, { payload }: PayloadAction<EmployeeDataInterface | null>) => {
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
    resetEmployeesToggle: () => initialState,
    resetSelectedEmployees: (state) => {
      state.selectedEmployee = null;
    }
  }
});

export const { setSelectedEmployee, setEmployeeInfoOpen, setAddNewEmployeeOpen, setIsEditEmployeeOpen, resetEmployeesToggle, resetSelectedEmployees } = employeesToggleSlice.actions;

export default employeesToggleSlice.reducer;
