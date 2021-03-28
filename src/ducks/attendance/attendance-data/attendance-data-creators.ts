import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserRole } from '../../auth/roles/roles';
import { AttendanceModel } from 'types';
import { baseStoreType } from 'store/store';
import { API_URL } from 'utils/config';

export const getSingleDayAttendance = createAsyncThunk<AttendanceModel[], Date | void, baseStoreType>(
  'attendanceData/getSingleDayAttendance',
  async (date, { rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;
    const { role } = getState().auth.roles;
    const { currentCompany } = getState().company.currentCompany;
    const { attendanceDate } = getState().attendance.attendanceToggle;

    try {
      if (currentCompany?._id && token && attendanceDate) {
        const { data } = await axios.get(
          role === UserRole.Admin
            ? `${API_URL}/attendance/single-day?date=${
                date ? new Date(date).toISOString() : new Date(attendanceDate).toISOString()
              }`
            : `${API_URL}/attendance/user?date=${date ? new Date(date).toISOString() : new Date(attendanceDate).toISOString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        return data as AttendanceModel[];
      } else {
        return [] as AttendanceModel[];
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
