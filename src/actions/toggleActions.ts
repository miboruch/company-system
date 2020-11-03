import { NotificationTypes, SET_NOTIFICATION_MESSAGE, SetNotificationMessage } from '../types/actionTypes/toggleAcitonTypes';
import { Dispatch } from 'redux';
import { selectEmployee } from './employeeActions';
import { selectClient } from './clientActions';
import { selectTask } from './taskActions';
import { selectAttendance } from './attendanceActions';

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
