import { EmployeeDataInterface } from './modelsTypes';

export const SET_LOADING = 'SET_LOADING';
export const SET_COMPANY_EMPLOYEES = 'SET_COMPANY_EMPLOYEES';
export const SET_SELECTED_EMPLOYEE = 'SET_SELECTED_EMPLOYEE';
export const SET_EMPLOYEE_ERROR = 'SET_EMPLOYEE_ERROR';
export const SET_EMPLOYEE_INFO_OPEN = 'SET_EMPLOYEE_INFO_OPEN';
export const SET_ADD_NEW_EMPLOYEE_OPEN = 'SET_ADD_NEW_EMPLOYEE_OPEN';

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SetCompanyEmployees {
  type: typeof SET_COMPANY_EMPLOYEES;
  payload: EmployeeDataInterface[];
}

export interface SetSelectedEmployee {
  type: typeof SET_SELECTED_EMPLOYEE;
  payload: EmployeeDataInterface | null;
}

export interface SetEmployeeError {
  type: typeof SET_EMPLOYEE_ERROR;
  payload: string | null;
}

export interface SetEmployeeInfoOpen {
  type: typeof SET_EMPLOYEE_INFO_OPEN;
  payload: boolean;
}

export interface SetAddNewEmployeeOpen {
  type: typeof SET_ADD_NEW_EMPLOYEE_OPEN;
  payload: boolean;
}

export type EmployeesActionTypes = SetLoading | SetCompanyEmployees | SetSelectedEmployee | SetEmployeeError | SetEmployeeInfoOpen | SetAddNewEmployeeOpen;
