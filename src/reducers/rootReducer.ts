import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { employeeReducer } from './employeeReducer';
import { companyReducer } from './companyReducer';
import { taskReducer } from './taskReducer';
import { clientReducer } from './clientReducer';
import { attendanceReducer } from './attendanceReducer';
import { toggleReducer } from './toggleReducer';
import { financeReducer } from './financeReducer';
import { notificationReducer } from './notificationReducer';

export const rootReducer = combineReducers({
  authenticationReducer,
  employeeReducer,
  companyReducer,
  taskReducer,
  clientReducer,
  attendanceReducer,
  toggleReducer,
  financeReducer,
  notificationReducer
});

export type AppState = ReturnType<typeof rootReducer>;
