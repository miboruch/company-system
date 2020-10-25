import { AttendanceInterface } from '../modelsTypes';

export const SET_ATTENDANCE_LOADING = 'SET_ATTENDANCE_LOADING';
export const SET_DATE = 'SET_DATE';
export const SET_DAY_ATTENDANCE = 'SET_DAY_ATTENDANCE';
export const SET_SELECTED_ATTENDANCE = 'SET_SELECTED_ATTENDANCE';
export const SET_ATTENDANCE_ERROR = 'SET_ATTENDANCE_ERROR';
export const SET_ATTENDANCE_INFO_OPEN = 'SET_ATTENDANCE_INFO_OPEN';
export const SET_ADD_NEW_ATTENDANCE_OPEN = 'SET_ADD_NEW_ATTENDANCE_OPEN';

export interface SetAttendanceLoading {
  type: typeof SET_ATTENDANCE_LOADING;
  payload: boolean;
}

export interface SetDate {
  type: typeof SET_DATE;
  payload: Date;
}

export interface SetDayAttendance {
  type: typeof SET_DAY_ATTENDANCE;
  payload: AttendanceInterface[];
}

export interface SetSelectedAttendance {
  type: typeof SET_SELECTED_ATTENDANCE;
  payload: AttendanceInterface | AttendanceInterface[] | null;
}

export interface SetAttendanceError {
  type: typeof SET_ATTENDANCE_ERROR;
  payload: string | null;
}

export interface SetAttendanceInfoOpen {
  type: typeof SET_ATTENDANCE_INFO_OPEN;
  payload: boolean;
}

export interface SetAddNewAttendanceOpen {
  type: typeof SET_ADD_NEW_ATTENDANCE_OPEN;
  payload: boolean;
}

export type AttendanceActionTypes = SetAttendanceLoading | SetDate | SetDayAttendance | SetSelectedAttendance | SetAttendanceError | SetAttendanceInfoOpen | SetAddNewAttendanceOpen;
