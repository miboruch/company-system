import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeekAttendanceModel } from 'types';
import { baseStoreType } from 'store/store';
import { companyApi } from 'api';

export const getWeekAttendance = createAsyncThunk<WeekAttendanceModel[], number, baseStoreType>(
  'weekAttendanceData/getWeekAttendance',
  async (weekCounter, { rejectWithValue, getState }) => {
    const { token } = getState().auth.tokens;
    const { selectedAttendance } = getState().attendance.attendanceToggle;

    try {
      if (selectedAttendance && token) {
        const { userId } = selectedAttendance;

        const { data } = await companyApi.get(`/attendance/user-week?user_id=${userId._id}&week=${weekCounter}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        return data as WeekAttendanceModel[];
      } else {
        return [] as WeekAttendanceModel[];
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
