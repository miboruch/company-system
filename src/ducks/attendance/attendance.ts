import { combineReducers } from 'redux';
import attendanceData from './attendance-data/attendance-data';
import attendanceToggle from './attendance-toggle/attendance-toggle';

export const attendance = combineReducers({ attendanceData, attendanceToggle });
