import axios from 'axios';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { API_URL } from '../../../utils/config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AttendanceInterface, WeekAttendance } from '../../../types/modelsTypes';
import { baseStoreType } from '../../../store/test-store';
import { adminApi } from '../../../api';

export const getSingleDayAttendance = createAsyncThunk<AttendanceInterface[], Date | void, baseStoreType>('attendanceData/getSingleDayAttendance', async (date, { rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;
  const { role } = getState().auth.roles;
  const { currentCompany } = getState().company.currentCompany;
  const { attendanceDate } = getState().attendance.attendanceToggle;

  try {
    if (currentCompany?._id && token && attendanceDate) {
      const { data } = await axios.get(
        role === UserRole.Admin
          ? `${API_URL}/attendance/single-day-attendance?company_id=${currentCompany._id}&date=${date ? new Date(date).toISOString() : new Date(attendanceDate).toISOString()}`
          : `${API_URL}/attendance/user-day-attendance?company_id=${currentCompany._id}&date=${date ? new Date(date).toISOString() : new Date(attendanceDate).toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return data as AttendanceInterface[];
    } else {
      return [] as AttendanceInterface[];
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getWeekAttendance = createAsyncThunk<WeekAttendance[], number, baseStoreType>('attendanceData/getSingleDayAttendance', async (weekCounter, { rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;
  const { selectedAttendance } = getState().attendance.attendanceToggle;

  try {
    if (currentCompany && selectedAttendance && token) {
      const { _id: companyId } = currentCompany;
      const { user } = selectedAttendance;

      const { data } = await adminApi.get(`${API_URL}/attendance/user-week-attendance?company_id=${companyId}&user_id=${user._id}&week=${weekCounter}`);

      return data as WeekAttendance[];
    } else {
      return [] as WeekAttendance[];
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
