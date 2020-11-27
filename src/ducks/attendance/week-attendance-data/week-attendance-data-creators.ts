import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeekAttendance } from '../../../types/modelsTypes';
import { baseStoreType } from '../../../store/test-store';
import { authApi } from '../../../api';

export const getWeekAttendance = createAsyncThunk<WeekAttendance[], number, baseStoreType>('weekAttendanceData/getWeekAttendance', async (weekCounter, { rejectWithValue, getState }) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().company.currentCompany;
  const { selectedAttendance } = getState().attendance.attendanceToggle;

  try {
    if (currentCompany && selectedAttendance && token) {
      const { user } = selectedAttendance;

      const { data } = await authApi.get(`/attendance/user-week-attendance?user_id=${user._id}&week=${weekCounter}`);

      return data as WeekAttendance[];
    } else {
      return [] as WeekAttendance[];
    }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
