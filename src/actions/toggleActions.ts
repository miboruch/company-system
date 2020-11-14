import axios from 'axios';
import {
  NotificationTypes,
  SET_NOTIFICATION_MESSAGE,
  SET_EDIT_CLIENT_COORDS_OPEN,
  SET_EDIT_COMPANY_COORDS_OPEN,
  SET_TASK_MAP_PREVIEW_OPEN,
  SET_CURRENCY,
  SetNotificationMessage,
  SetEditClientCoordsOpen,
  SetEditCompanyCoordsOpen,
  SetTaskMapPreviewOpen,
  SetCurrency
} from '../types/actionTypes/toggleAcitonTypes';
import { Dispatch } from 'redux';
import { resetEmployees, selectEmployee } from './employeeActions';
import { resetClients, selectClient } from './clientActions';
import { resetTasks, selectTask } from './taskActions';
import { resetAttendance, selectAttendance } from './attendanceActions';
import { UserRole } from '../types/actionTypes/authenticationActionTypes';
import { setUserRole } from './authenticationActions';
import { resetCompany } from './companyActions';
import { resetFinances } from './financeActions';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { AppState } from '../reducers/rootReducer';
import { CURRENCY_API_URL } from '../utils/config';

export const setNotificationMessage = (message: string | null, notificationType: NotificationTypes | null = NotificationTypes.Success): SetNotificationMessage => {
  return {
    type: SET_NOTIFICATION_MESSAGE,
    message,
    notificationType
  };
};

export const setEditClientCoordsOpen = (isOpen: boolean): SetEditClientCoordsOpen => {
  return {
    type: SET_EDIT_CLIENT_COORDS_OPEN,
    payload: isOpen
  };
};

export const setEditCompanyCoordsOpen = (isOpen: boolean): SetEditCompanyCoordsOpen => {
  return {
    type: SET_EDIT_COMPANY_COORDS_OPEN,
    payload: isOpen
  };
};

export const setTaskMapPreviewOpen = (isOpen: boolean): SetTaskMapPreviewOpen => {
  return {
    type: SET_TASK_MAP_PREVIEW_OPEN,
    payload: isOpen
  };
};

const setCurrency = (name: string, value: number): SetCurrency => {
  return {
    type: SET_CURRENCY,
    payload: {
      name,
      value
    }
  };
};

export const getCurrencyValue = (currencyName: string) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    const { data } = await axios.get(`${CURRENCY_API_URL}/latest?base=PLN&symbols=${currencyName}`);
    const value = data.rates[currencyName];
    dispatch(setCurrency(currencyName, value));
  } catch (error) {
    console.log(error);
  }
};

export const resetAllSelected = () => async (dispatch: Dispatch<any>) => {
  dispatch(selectEmployee(null));
  dispatch(selectClient(null));
  dispatch(selectTask(null));
  dispatch(selectAttendance(null));
};

export const resetState = () => async (dispatch: Dispatch<any>) => {
  dispatch(resetAttendance());
  dispatch(resetClients());
  dispatch(resetCompany());
  dispatch(resetEmployees());
  dispatch(resetFinances());
  dispatch(resetTasks());
};

export const changeUserRoleTo = (role: UserRole, callback: () => void) => async (dispatch: Dispatch<any>) => {
  dispatch(setUserRole(role));
  dispatch(resetState());
  callback();
};
