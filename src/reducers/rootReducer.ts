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
import { tasks } from '../ducks/tasks/tasks';
import { client } from '../ducks/client/client';
import notifications from '../ducks/notifications/notifications';
import currency from '../ducks/currency/currency';
import popup from '../ducks/popup/popup';

export const rootReducer = combineReducers({
  auth,
  company,
  employees,
  tasks,
  client,
  attendance,
  financeReducer,
  currency,
  notifications,
  popup
});

// export type AppState = ReturnType<typeof rootReducer>;
