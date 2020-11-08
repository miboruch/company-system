import axios from 'axios';
import {
  RESET_ATTENDANCE,
  ResetAttendance,
  SET_ADD_NEW_ATTENDANCE_OPEN,
  SET_ATTENDANCE_CONTENT_LOADING,
  SET_ATTENDANCE_ERROR,
  SET_ATTENDANCE_INFO_OPEN,
  SET_ATTENDANCE_LOADING,
  SET_DATE,
  SET_DAY_ATTENDANCE,
  SET_SELECTED_ATTENDANCE,
  SET_WEEK_ATTENDANCE,
  SetAddNewAttendanceOpen,
  SetAttendanceContentLoading,
  SetAttendanceError,
  SetAttendanceInfoOpen,
  SetAttendanceLoading,
  SetDate,
  SetDayAttendance,
  SetSelectedAttendance,
  SetWeekAttendance
} from '../types/actionTypes/attendanceActionTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { API_URL } from '../utils/config';
import { AttendanceInterface, WeekAttendance } from '../types/modelsTypes';
import { AppState } from '../reducers/rootReducer';
import { setNotificationMessage } from './toggleActions';
import { NotificationTypes } from '../types/actionTypes/toggleAcitonTypes';

const setAttendanceLoading = (isLoading: boolean): SetAttendanceLoading => {
  return {
    type: SET_ATTENDANCE_LOADING,
    payload: isLoading
  };
};

const setAttendanceContentLoading = (isLoading: boolean): SetAttendanceContentLoading => {
  return {
    type: SET_ATTENDANCE_CONTENT_LOADING,
    payload: isLoading
  };
};

const setDayAttendance = (dayAttendance: AttendanceInterface[]): SetDayAttendance => {
  return {
    type: SET_DAY_ATTENDANCE,
    payload: dayAttendance
  };
};

const setSelectedAttendance = (selectedAttendance: AttendanceInterface | null): SetSelectedAttendance => {
  return {
    type: SET_SELECTED_ATTENDANCE,
    payload: selectedAttendance
  };
};

const setWeekAttendance = (weekAttendance: WeekAttendance[] | null): SetWeekAttendance => {
  return {
    type: SET_WEEK_ATTENDANCE,
    payload: weekAttendance
  };
};

export const setDate = (date: Date): SetDate => {
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

export const getSingleDayAttendance = (date?: Date) => async (dispatch: Dispatch<AppTypes>, getState: () => AppState) => {
  dispatch(setAttendanceLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;
  const { attendanceDate } = getState().attendanceReducer;

  try {
    if (currentCompany?._id && token && attendanceDate) {
      const { data } = await axios.get(`${API_URL}/attendance/single-day-attendance?company_id=${currentCompany._id}&date=${date ? date.toISOString() : attendanceDate.toISOString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(data);

      dispatch(setDayAttendance(data));
    } else {
      dispatch(setAttendanceError('Problem z uwierzytelnieniem'));
    }
  } catch (error) {
    console.log(error);
    dispatch(setAttendanceError(error));
  }
};

export const getWeekAttendance = (weekCounter: number) => async (dispatch: Dispatch<AppTypes>, getState: () => AppState) => {
  dispatch(setAttendanceContentLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;
  const { selectedAttendance } = getState().attendanceReducer;

  try {
    if (currentCompany && selectedAttendance && token) {
      const { _id: companyId } = currentCompany;
      const { user } = selectedAttendance;

      const { data } = await axios.get(`${API_URL}/attendance/user-week-attendance?company_id=${companyId}&user_id=${user._id}&week=${weekCounter}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setWeekAttendance(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const selectAttendance = (attendance: AttendanceInterface | null) => (dispatch: Dispatch<any>) => {
  dispatch(setSelectedAttendance(attendance));
  dispatch(setAttendanceInfoOpen(!!attendance));
  dispatch(getWeekAttendance(-3));
};

export const addAttendance = (userId: string, date: Date, wasPresent: boolean, hours: number) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      await axios.post(
        `${API_URL}/attendance/add-new?company_id=${currentCompany._id}`,
        {
          userId,
          date,
          wasPresent,
          hours: hours ? hours : 0
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(setNotificationMessage('Dodano obecność'));
      dispatch(getSingleDayAttendance());
    }
  } catch (error) {
    dispatch(setNotificationMessage('Problem z dodaniem obecności', NotificationTypes.Error));
  }
};

export const updateAttendance = (attendanceId: string, wasPresent: boolean, hours: number) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      await axios.put(
        `${API_URL}/attendance/edit-attendance?company_id=${currentCompany._id}`,
        {
          attendanceId,
          wasPresent,
          hours: hours
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(setNotificationMessage('Zaktualizowano obecność'));
      dispatch(getSingleDayAttendance());
    }
  } catch (error) {
    dispatch(setNotificationMessage('Problem z aktualizacją obecności', NotificationTypes.Error));
  }
};

export const resetAttendance = (): ResetAttendance => {
  return {
    type: RESET_ATTENDANCE
  };
};
