import { combineReducers } from 'redux';
import employeesData from './employees-data/employees-data';
import employeesToggle from './employees-toggle/employees-toggle';

export const employees = combineReducers({ employeesData, employeesToggle });
