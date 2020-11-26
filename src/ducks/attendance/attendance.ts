import { combineReducers } from 'redux';
import attendanceData from './attendance-data/attendance-data';
import attendanceToggle from './attendance-toggle/attendance-toggle';
import weekAttendanceData from './week-attendance-data/week-attendance-data';

export const attendance = combineReducers({ attendanceData, attendanceToggle, weekAttendanceData });
