import {
  AttendanceActionTypes,
  SET_ADD_NEW_ATTENDANCE_OPEN,
  SET_ATTENDANCE_CONTENT_LOADING,
  SET_ATTENDANCE_ERROR,
  SET_ATTENDANCE_INFO_OPEN,
  SET_ATTENDANCE_LOADING,
  SET_DATE,
  SET_DAY_ATTENDANCE,
  SET_SELECTED_ATTENDANCE,
  SET_WEEK_ATTENDANCE
} from '../types/actionTypes/attendanceActionTypes';
import { AttendanceInterface, WeekAttendance } from '../types/modelsTypes';

interface DefaultState {
  singleDayAttendance: AttendanceInterface[];
  selectedAttendance: AttendanceInterface | null;
  weekAttendance: WeekAttendance[] | null;
  attendanceDate: Date;
  isLoading: boolean;
  isContentLoading: boolean;
  error: string | null;
  isAttendanceInfoOpen: boolean;
  isAddNewAttendanceOpen: boolean;
}

const initialState: DefaultState = {
  singleDayAttendance: [],
  selectedAttendance: null,
  weekAttendance: null,
  attendanceDate: new Date(),
  isLoading: false,
  isContentLoading: false,
  error: null,
  isAttendanceInfoOpen: false,
  isAddNewAttendanceOpen: false
};

export const attendanceReducer = (state = initialState, action: AttendanceActionTypes): DefaultState => {
  switch (action.type) {
    case SET_ATTENDANCE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_ATTENDANCE_CONTENT_LOADING:
      return {
        ...state,
        isContentLoading: false
      };
    case SET_DAY_ATTENDANCE:
      return {
        ...state,
        isLoading: false,
        singleDayAttendance: action.payload
      };
    case SET_WEEK_ATTENDANCE:
      return {
        ...state,
        isContentLoading: false,
        weekAttendance: action.payload
      };
    case SET_DATE:
      return {
        ...state,
        attendanceDate: action.payload
      };
    case SET_SELECTED_ATTENDANCE:
      return {
        ...state,
        selectedAttendance: action.payload
      };
    case SET_ATTENDANCE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case SET_ATTENDANCE_INFO_OPEN:
      return {
        ...state,
        isAttendanceInfoOpen: action.payload
      };
    case SET_ADD_NEW_ATTENDANCE_OPEN:
      return {
        ...state,
        isAddNewAttendanceOpen: action.payload
      };
    default:
      return state;
  }
};
