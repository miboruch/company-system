import { combineReducers } from 'redux';
import { auth } from '../ducks/auth/auth';
import { company } from '../ducks/company/company';
import { attendance } from '../ducks/attendance/attendance';
import { client } from '../ducks/client/client';
import { finances } from '../ducks/finances/finances';
import { employees } from '../ducks/employees/employees';
import popup from '../ducks/popup/popup';
import currency from '../ducks/currency/currency';

export const testRootReducer = combineReducers({ auth, popup, currency, company, attendance, client, finances, employees });
