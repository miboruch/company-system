import { combineReducers } from 'redux';

import { auth } from 'ducks/auth/auth';
import { company } from 'ducks/company/company';
import { attendance } from 'ducks/attendance/attendance';
import { employees } from 'ducks/employees/employees';
import { tasks } from 'ducks/tasks/tasks';
import { client } from 'ducks/client/client';
import { finances } from 'ducks/finances/finances';
import user from 'ducks/user/user';
import notifications from 'ducks/notifications/notifications';
import currency from 'ducks/currency/currency';
import popup from 'ducks/popup/popup';
import allUsers from 'ducks/users/all-users';
import initialLoad from 'ducks/app/initial-load';

export const rootReducer = combineReducers({
  auth,
  company,
  employees,
  tasks,
  client,
  attendance,
  finances,
  user,
  currency,
  notifications,
  popup,
  allUsers,
  initialLoad
});
