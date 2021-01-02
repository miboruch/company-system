import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeekAttendance } from 'types/modelsTypes';
import { baseStoreType } from 'store/store';
import { companyApi } from 'api';

export const getWeekAttendance = createAsyncThunk<WeekAttendance[], number, baseStoreType>('weekAttendanceData/getWeekAttendance', async (weekCounter, { rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;
  const { selectedAttendance } = getState().attendance.attendanceToggle;

  try {
    if (selectedAttendance && token) {
      const { user } = selectedAttendance;

      const { data } = await companyApi.get(`/attendance/user-week-attendance?user_id=${user._id}&week=${weekCounter}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return data as WeekAttendance[];
    } else {
      return [] as WeekAttendance[];
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
