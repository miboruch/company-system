import axios from 'axios';
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
import { Dispatch } from 'redux';
import { AppTypes } from '../types/appActionTypes';
import { API_URL } from '../utils/config';

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

export const setSelectedEmployee = (employee: EmployeeDataInterface | null): SetSelectedEmployee => {
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

export const setEmployeeInfoOpen = (isOpen: boolean): SetEmployeeInfoOpen => {
  return {
    type: SET_EMPLOYEE_INFO_OPEN,
    payload: isOpen
  };
};

export const getAllCompanyEmployees = (token: string, companyId: string) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    dispatch(setLoading(true));

    const { data } = await axios.get(`${API_URL}/employee/get-company-employees?company_id=${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // data.length > 0 && dispatch(setSelectedEmployee(data[0]));

    dispatch(setCompanyEmployees(data));
  } catch (error) {
    dispatch(setEmployeeError(error));
  }
};

export const selectEmployee = (employee: EmployeeDataInterface | null) => (dispatch: Dispatch<AppTypes>) => {
  dispatch(setSelectedEmployee(employee));
  dispatch(setEmployeeInfoOpen(true));
};
//TODO: on click set current employee
