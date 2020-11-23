import { combineReducers } from 'redux';
import budget from './budget/budget';
import incomeExpense from './income-expense/income-expense';

export const finances = combineReducers({ budget, incomeExpense });
