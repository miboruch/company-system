import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AttendanceModel } from 'types';
import { getSingleDayAttendance } from './attendance-data-creators';

interface InitialStateInterface {
  isAttendanceLoading: boolean;
  attendanceError: string | undefined;
  singleDayAttendance: AttendanceModel[];
}

const initialState: InitialStateInterface = {
  isAttendanceLoading: false,
  attendanceError: undefined,
  singleDayAttendance: []
};

const attendanceDataSlice = createSlice({
  name: 'attendanceData',
  initialState,
  reducers: {
    resetAttendanceData: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleDayAttendance.pending.type, (state) => {
        state.isAttendanceLoading = true;
        state.attendanceError = undefined;
      })
      .addCase(getSingleDayAttendance.fulfilled.type, (state, { payload }: PayloadAction<AttendanceModel[]>) => {
        state.isAttendanceLoading = false;
        state.singleDayAttendance = payload;
      })
      .addCase(getSingleDayAttendance.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
        state.isAttendanceLoading = false;
        state.attendanceError = payload;
      });
  }
});

export const { resetAttendanceData } = attendanceDataSlice.actions;

export default attendanceDataSlice.reducer;
