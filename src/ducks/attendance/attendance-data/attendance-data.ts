import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AttendanceInterface, WeekAttendance } from '../../../types/modelsTypes';
import { getSingleDayAttendance, getWeekAttendance } from './attendance-data-creators';

interface InitialStateInterface {
  isAttendanceLoading: boolean;
  attendanceError: string | undefined;
  singleDayAttendance: AttendanceInterface[];
  weekAttendance: WeekAttendance[] | null;
}

const initialState: InitialStateInterface = {
  isAttendanceLoading: false,
  attendanceError: undefined,
  singleDayAttendance: [],
  weekAttendance: null
};

const attendanceDataSlice = createSlice({
  name: 'attendanceData',
  initialState,
  reducers: {
    resetAttendanceData: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getSingleDayAttendance.pending.type, (state) => {
      state.isAttendanceLoading = true;
      state.attendanceError = undefined;
    });
    builder.addCase(getSingleDayAttendance.fulfilled.type, (state, { payload }: PayloadAction<AttendanceInterface[]>) => {
      state.isAttendanceLoading = false;
      state.singleDayAttendance = payload;
    });
    builder.addCase(getSingleDayAttendance.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.isAttendanceLoading = false;
      state.attendanceError = payload;
    });
    builder.addCase(getWeekAttendance.pending.type, (state) => {
      state.isAttendanceLoading = true;
      state.attendanceError = undefined;
    });
    builder.addCase(getWeekAttendance.fulfilled.type, (state, { payload }: PayloadAction<WeekAttendance[]>) => {
      state.isAttendanceLoading = false;
      state.weekAttendance = payload;
    });
    builder.addCase(getWeekAttendance.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.isAttendanceLoading = false;
      state.attendanceError = payload;
    });
  }
});

export const { resetAttendanceData } = attendanceDataSlice.actions;

export default attendanceDataSlice.reducer;
