import { setSelectedAttendance, setAttendanceInfoOpen } from './attendance-toggle';
import { AttendanceInterface } from '../../../types/modelsTypes';
import { AppDispatch } from '../../../store/test-store';

export const selectAttendance = (attendance: AttendanceInterface | null) => (dispatch: AppDispatch): void => {
  dispatch(setSelectedAttendance(attendance));
  dispatch(setAttendanceInfoOpen(!!attendance));
  // dispatch(getWeekAttendance(-3));
};
