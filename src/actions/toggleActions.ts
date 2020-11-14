import {
  NotificationTypes,
  SET_NOTIFICATION_MESSAGE,
  SET_EDIT_CLIENT_COORDS_OPEN,
  SET_EDIT_COMPANY_COORDS_OPEN,
  SET_TASK_MAP_PREVIEW_OPEN,
  SetNotificationMessage,
  SetEditClientCoordsOpen,
  SetEditCompanyCoordsOpen,
  SetTaskMapPreviewOpen
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

export const setTaskMapPreviewOpen = (isOpen: boolean) => {
  return {
    type: SET_TASK_MAP_PREVIEW_OPEN,
    payload: isOpen
  };
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
