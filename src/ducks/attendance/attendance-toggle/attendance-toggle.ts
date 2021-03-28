import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AttendanceModel } from 'types';

interface InitialStateInterface {
  isAttendanceInfoOpen: boolean;
  isAddNewAttendanceOpen: boolean;
  selectedAttendance: AttendanceModel | null;
  attendanceDate: Date | string;
}

const initialState: InitialStateInterface = {
  isAttendanceInfoOpen: false,
  isAddNewAttendanceOpen: false,
  selectedAttendance: null,
  attendanceDate: new Date().toString()
};

const attendanceToggleSlice = createSlice({
  name: 'attendanceToggle',
  initialState,
  reducers: {
    setSelectedAttendance: (state, { payload }: PayloadAction<AttendanceModel | null>) => {
      state.selectedAttendance = payload;
    },
    setDate: (state, { payload }: PayloadAction<Date>) => {
      state.attendanceDate = payload;
    },
    setAttendanceInfoOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isAttendanceInfoOpen = payload;
    },
    setAddNewAttendanceOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isAddNewAttendanceOpen = payload;
    },
    resetAttendanceToggle: () => initialState
  }
});

export const {
  setSelectedAttendance,
  setDate,
  setAttendanceInfoOpen,
  setAddNewAttendanceOpen,
  resetAttendanceToggle
} = attendanceToggleSlice.actions;

export default attendanceToggleSlice.reducer;
