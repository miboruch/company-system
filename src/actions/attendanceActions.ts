import axios from 'axios';
import {
  SetAttendanceLoading,
  SetDayAttendance,
  SetSelectedAttendance,
  SetDate,
  SetAttendanceError,
  SetAttendanceInfoOpen,
  SetAddNewAttendanceOpen,
  SET_ATTENDANCE_LOADING,
  SET_DAY_ATTENDANCE,
  SET_SELECTED_ATTENDANCE,
  SET_DATE,
  SET_ATTENDANCE_ERROR,
  SET_ATTENDANCE_INFO_OPEN,
  SET_ADD_NEW_ATTENDANCE_OPEN
} from '../types/actionTypes/attendanceActionTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { API_URL } from '../utils/config';
import { AttendanceInterface } from '../types/modelsTypes';

const setAttendanceLoading = (isLoading: boolean): SetAttendanceLoading => {
  return {
    type: SET_ATTENDANCE_LOADING,
    payload: isLoading
  };
};

const setDayAttendance = (dayAttendance: AttendanceInterface[]): SetDayAttendance => {
  return {
    type: SET_DAY_ATTENDANCE,
    payload: dayAttendance
  };
};

const setSelectedAttendance = (selectedAttendance: AttendanceInterface[] | AttendanceInterface | null): SetSelectedAttendance => {
  return {
    type: SET_SELECTED_ATTENDANCE,
    payload: selectedAttendance
  };
};

const setDate = (date: Date): SetDate => {
  return {
    type: SET_DATE,
    payload: date
  };
};

const setAttendanceError = (error: string | null): SetAttendanceError => {
  return {
    type: SET_ATTENDANCE_ERROR,
    payload: error
  };
};

export const setAttendanceInfoOpen = (isOpen: boolean): SetAttendanceInfoOpen => {
  return {
    type: SET_ATTENDANCE_INFO_OPEN,
    payload: isOpen
  };
};

const setAddNewAttendanceOpen = (isOpen: boolean): SetAddNewAttendanceOpen => {
  return {
    type: SET_ADD_NEW_ATTENDANCE_OPEN,
    payload: isOpen
  };
};

export const getSingleDayAttendance = (token: string, companyId: string, date: Date) => async (dispatch: Dispatch<AppTypes>) => {
  dispatch(setAttendanceLoading(true));

  try {
    const { data } = await axios.get(`${API_URL}/attendance/single-day-attendance?company_id=${companyId}&date=${date.toISOString()}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(setDayAttendance(data));
  } catch (error) {
    console.log(error);
    dispatch(setAttendanceError(error));
  }
};

export const selectAttendance = (attendance: AttendanceInterface[] | AttendanceInterface | null) => (dispatch: Dispatch<AppTypes>) => {
  dispatch(setSelectedAttendance(attendance));
  dispatch(setAttendanceInfoOpen(true));
};

//TODO: get attendance of a single employee with date, 3 days ahead and back
