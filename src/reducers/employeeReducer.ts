import {
  EmployeesActionTypes,
  SET_ADD_NEW_EMPLOYEE_OPEN,
  SET_COMPANY_EMPLOYEES,
  SET_EMPLOYEE_ERROR,
  SET_EMPLOYEE_INFO_OPEN,
  SET_LOADING,
  SET_SELECTED_EMPLOYEE
} from '../types/employeesTypes';
import { EmployeeDataInterface } from '../types/modelsTypes';

interface DefaultState {
  allCompanyEmployees: EmployeeDataInterface[];
  selectedEmployee: EmployeeDataInterface | null;
  isLoading: boolean;
  error: string | null;
  isEmployeeInfoOpen: boolean;
  isAddNewOpen: boolean;
}

const initialState: DefaultState = {
  allCompanyEmployees: [],
  selectedEmployee: null,
  isLoading: false,
  error: null,
  isEmployeeInfoOpen: false,
  isAddNewOpen: false
};

export const employeeReducer = (state = initialState, action: EmployeesActionTypes): DefaultState => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_COMPANY_EMPLOYEES:
      return {
        ...state,
        allCompanyEmployees: action.payload
      };
    case SET_SELECTED_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.payload
      };
    case SET_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_EMPLOYEE_INFO_OPEN:
      return {
        ...state,
        isEmployeeInfoOpen: action.payload
      };
    case SET_ADD_NEW_EMPLOYEE_OPEN:
      return {
        ...state,
        isAddNewOpen: action.payload
      };
    default:
      return state;
  }
};
