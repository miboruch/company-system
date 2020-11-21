import {
  EmployeesActionTypes,
  RESET_EMPLOYEES,
  SET_ADD_NEW_EMPLOYEE_OPEN,
  SET_COMPANY_EMPLOYEES,
  SET_EDIT_EMPLOYEE,
  SET_EMPLOYEE_ERROR,
  SET_EMPLOYEE_INFO_OPEN,
  SET_EMPLOYEE_LOADING,
  SET_SELECTED_EMPLOYEE,
  SET_COMPANY_EMPLOYEE_COUNTER
} from '../types/actionTypes/employeesActionTypes';
import { EmployeeDataInterface } from '../types/modelsTypes';

interface DefaultState {
  allCompanyEmployees: EmployeeDataInterface[];
  selectedEmployee: EmployeeDataInterface | null;
  isLoading: boolean;
  error: string | null;
  isEmployeeInfoOpen: boolean;
  companyEmployeesCounter: number;
  isAddNewOpen: boolean;
  isEditEmployeeOpen: boolean;
}

const initialState: DefaultState = {
  allCompanyEmployees: [],
  selectedEmployee: null,
  isLoading: false,
  error: null,
  isEmployeeInfoOpen: false,
  companyEmployeesCounter: 0,
  isAddNewOpen: false,
  isEditEmployeeOpen: false
};

export const employeeReducer = (state = initialState, action: EmployeesActionTypes): DefaultState => {
  switch (action.type) {
    case SET_EMPLOYEE_LOADING:
      return {
        ...state,
        isLoading: action.payload
        // selectedEmployee: null
      };
    case SET_COMPANY_EMPLOYEES:
      return {
        ...state,
        allCompanyEmployees: action.payload,
        isLoading: false
      };
    case SET_SELECTED_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.payload
      };
    case SET_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
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
    case SET_EDIT_EMPLOYEE:
      return {
        ...state,
        isEditEmployeeOpen: action.payload
      };
    case SET_COMPANY_EMPLOYEE_COUNTER:
      return {
        ...state,
        companyEmployeesCounter: action.payload
      };
    case RESET_EMPLOYEES:
      return initialState;
    default:
      return state;
  }
};
