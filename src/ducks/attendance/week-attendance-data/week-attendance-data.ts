import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeekAttendance } from '../../../types/modelsTypes';
import { getWeekAttendance } from './week-attendance-data-creators';

interface InitialStateInterface {
  isContentLoading: boolean;
  weekAttendanceError: string | undefined;
  weekAttendance: WeekAttendance[] | null;
}

const initialState: InitialStateInterface = {
  isContentLoading: false,
  weekAttendance: null,
  weekAttendanceError: undefined
};

const weekAttendanceDataSlice = createSlice({
  name: 'weekAttendanceData',
  initialState,
  reducers: {
    resetWeekAttendanceData: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeekAttendance.pending.type, (state) => {
        state.weekAttendanceError = undefined;
      })
      .addCase(getWeekAttendance.fulfilled.type, (state, { payload }: PayloadAction<WeekAttendance[]>) => {
        state.weekAttendance = payload;
      })
      .addCase(getWeekAttendance.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
        state.weekAttendanceError = payload;
      });
  }
});

export const { resetWeekAttendanceData } = weekAttendanceDataSlice.actions;

export default weekAttendanceDataSlice.reducer;
