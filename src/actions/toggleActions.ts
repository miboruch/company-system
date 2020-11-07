import { NotificationTypes, SET_NOTIFICATION_MESSAGE, SetNotificationMessage } from '../types/actionTypes/toggleAcitonTypes';
import { Dispatch } from 'redux';
import { selectEmployee } from './employeeActions';
import { selectClient } from './clientActions';
import { selectTask } from './taskActions';
import { selectAttendance } from './attendanceActions';
import { UserRole } from '../types/actionTypes/authenticationActionTypes';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { AppState } from '../reducers/rootReducer';
import { setUserRole } from './authenticationActions';
import { setAllUserCompanies, setCompany } from './companyActions';

export const setNotificationMessage = (message: string | null, notificationType: NotificationTypes | null = NotificationTypes.Success): SetNotificationMessage => {
  return {
    type: SET_NOTIFICATION_MESSAGE,
    message,
    notificationType
  };
};

export const resetAllSelected = () => async (dispatch: Dispatch<any>) => {
  dispatch(selectEmployee(null));
  dispatch(selectClient(null));
  dispatch(selectTask(null));
  dispatch(selectAttendance(null));
};

export const changeUserRole = (role: UserRole, callback: () => void) =>async (dispatch: Dispatch<any>, getState: () => AppState) => {
  // dispatch(setUserRole(role));
  dispatch(setAllUserCompanies([]));
  dispatch(resetAllSelected());
  dispatch(setCompany(null));
  callback();
}
