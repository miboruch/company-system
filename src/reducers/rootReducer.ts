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

import { auth } from '../ducks/auth/auth';
import { company } from '../ducks/company/company';
import { attendance } from '../ducks/attendance/attendance';
import { employees } from '../ducks/employees/employees';

export const rootReducer = combineReducers({
  auth,
  company,
  employeeReducer,
  employees,
  // companyReducer,
  taskReducer,
  clientReducer,
  attendanceReducer,
  attendance,
  toggleReducer,
  financeReducer,
  notificationReducer
});

// export type AppState = ReturnType<typeof rootReducer>;
