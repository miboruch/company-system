import {
  SET_ADD_NEW_EMPLOYEE_OPEN,
  SET_COMPANY_EMPLOYEES,
  SET_EMPLOYEE_ERROR,
  SET_EMPLOYEE_INFO_OPEN,
  SET_LOADING,
  SET_SELECTED_EMPLOYEE,
  SetAddNewEmployeeOpen,
  SetCompanyEmployees,
  SetEmployeeError,
  SetEmployeeInfoOpen,
  SetLoading,
  SetSelectedEmployee
} from '../types/employeesTypes';
import { EmployeeDataInterface } from '../types/modelsTypes';

const setLoading = (isLoading: boolean): SetLoading => {
  return {
    type: SET_LOADING,
    payload: isLoading
  };
};

const setCompanyEmployees = (employees: EmployeeDataInterface[]): SetCompanyEmployees => {
  return {
    type: SET_COMPANY_EMPLOYEES,
    payload: employees
  };
};

const setSelectedEmployee = (employee: EmployeeDataInterface | null): SetSelectedEmployee => {
  return {
    type: SET_SELECTED_EMPLOYEE,
    payload: employee
  };
};

const setEmployeeError = (error: string | null): SetEmployeeError => {
  return {
    type: SET_EMPLOYEE_ERROR,
    payload: error
  };
};

const setAddNewEmployeeOpen = (isOpen: boolean): SetAddNewEmployeeOpen => {
  return {
    type: SET_ADD_NEW_EMPLOYEE_OPEN,
    payload: isOpen
  };
};

const setEmployeeInfoOpen = (isOpen: boolean): SetEmployeeInfoOpen => {
  return {
    type: SET_EMPLOYEE_INFO_OPEN,
    payload: isOpen
  };
};
