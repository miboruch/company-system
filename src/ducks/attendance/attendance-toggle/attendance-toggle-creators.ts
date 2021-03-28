import { setSelectedAttendance, setAttendanceInfoOpen } from './attendance-toggle';
import { AttendanceModel } from 'types';
import { AppDispatch } from 'store/store';
import { getWeekAttendance } from '../week-attendance-data/week-attendance-data-creators';

export const selectAttendance = (attendance: AttendanceModel | null) => (dispatch: AppDispatch): void => {
  dispatch(setSelectedAttendance(attendance));
  dispatch(setAttendanceInfoOpen(!!attendance));
  dispatch(getWeekAttendance(-3));
};
