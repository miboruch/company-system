import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AttendanceInterface } from '../../../types/modelsTypes';

interface InitialStateInterface {
  isAttendanceInfoOpen: boolean;
  isAddNewAttendanceOpen: boolean;
  selectedAttendance: AttendanceInterface | null;
  attendanceDate: Date;
}

const initialState: InitialStateInterface = {
  isAttendanceInfoOpen: false,
  isAddNewAttendanceOpen: false,
  selectedAttendance: null,
  attendanceDate: new Date()
};

const attendanceToggleSlice = createSlice({
  name: 'attendanceToggle',
  initialState,
  reducers: {
    setSelectedAttendance: (state, { payload }: PayloadAction<AttendanceInterface | null>) => {
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
    resetAttendanceToggle: () => initialState,
    resetSelectedAttendance: (state) => {
      state.selectedAttendance = null;
    }
  }
});

export const { setSelectedAttendance, setDate, setAttendanceInfoOpen, setAddNewAttendanceOpen, resetAttendanceToggle, resetSelectedAttendance } = attendanceToggleSlice.actions;

export default attendanceToggleSlice.reducer;
