import axios from 'axios';
import {
  SET_ADD_NEW_EMPLOYEE_OPEN,
  SET_COMPANY_EMPLOYEES,
  SET_EDIT_EMPLOYEE,
  SET_EMPLOYEE_ERROR,
  SET_EMPLOYEE_INFO_OPEN,
  SET_EMPLOYEE_LOADING,
  SET_SELECTED_EMPLOYEE,
  SetAddNewEmployeeOpen,
  SetCompanyEmployees,
  SetEditEmployee,
  SetEmployeeError,
  SetEmployeeInfoOpen,
  SetEmployeeLoading,
  SetSelectedEmployee
} from '../types/actionTypes/employeesActionTypes';
import { EmployeeDataInterface } from '../types/modelsTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { API_URL } from '../utils/config';
import { AppState } from '../reducers/rootReducer';
import { setNotificationMessage } from './toggleActions';
import { NotificationTypes } from '../types/actionTypes/toggleAcitonTypes';

const setEmployeeLoading = (isLoading: boolean): SetEmployeeLoading => {
  return {
    type: SET_EMPLOYEE_LOADING,
    payload: isLoading
  };
};

export const setCompanyEmployees = (employees: EmployeeDataInterface[]): SetCompanyEmployees => {
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

export const setAddNewEmployeeOpen = (isOpen: boolean): SetAddNewEmployeeOpen => {
  return {
    type: SET_ADD_NEW_EMPLOYEE_OPEN,
    payload: isOpen
  };
};

export const setEditEmployee = (isOpen: boolean): SetEditEmployee => {
  return {
    type: SET_EDIT_EMPLOYEE,
    payload: isOpen
  };
};

export const setEmployeeInfoOpen = (isOpen: boolean): SetEmployeeInfoOpen => {
  return {
    type: SET_EMPLOYEE_INFO_OPEN,
    payload: isOpen
  };
};

export const getAllCompanyEmployees = () => async (dispatch: Dispatch<AppTypes>, getState: () => AppState) => {
  dispatch(setEmployeeLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany?._id && token) {
      const { data } = await axios.get(`${API_URL}/employee/get-company-employees?company_id=${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // data.length > 0 && dispatch(setSelectedEmployee(data[0]));

      dispatch(setCompanyEmployees(data));
    } else {
      dispatch(setEmployeeError('Brak danych'));
    }
  } catch (error) {
    dispatch(setEmployeeError(error));
  }
};

export const selectEmployee = (employee: EmployeeDataInterface | null) => (dispatch: Dispatch<AppTypes>) => {
  dispatch(setSelectedEmployee(employee));
  dispatch(setEmployeeInfoOpen(!!employee));
};

export const updateEmployeeSalary = (pricePerHour?: number, monthlyPrice?: number) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  if (!pricePerHour && !monthlyPrice) {
    return dispatch(setEmployeeError('Brak danych'));
  }

  interface MainDataInterface {
    employeeId: string;
  }

  interface DataHourInterface extends MainDataInterface {
    pricePerHour?: number;
  }

  interface DataMonthlyInterface extends MainDataInterface {
    monthlyPrice?: number;
  }

  const { selectedEmployee } = getState().employeeReducer;
  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (selectedEmployee && token && currentCompany) {
      const data: DataHourInterface | DataMonthlyInterface = !!pricePerHour
        ? {
            employeeId: selectedEmployee._id,
            pricePerHour: pricePerHour
          }
        : {
            employeeId: selectedEmployee._id,
            monthlyPrice: monthlyPrice
          };

      await axios.put(`${API_URL}/employee/update-employee?company_id=${currentCompany._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setNotificationMessage('Zaktualizowano wypłatę pracownika'));
      dispatch(getAllCompanyEmployees());
      dispatch(setSelectedEmployee(null));
      dispatch(setEmployeeInfoOpen(false));
    } else {
      dispatch(setEmployeeError('Brak danych'));
      dispatch(setNotificationMessage('Problem z aktualizacją', NotificationTypes.Error));
    }
  } catch (error) {
    dispatch(setNotificationMessage('Problem z aktualizacją', NotificationTypes.Error));
    console.log(error.response);
  }
};
