import { combineReducers } from 'redux';
import { auth } from '../ducks/auth/auth';
import popup from '../ducks/popup/popup';
import currency from '../ducks/currency/currency';

export const testRootReducer = combineReducers({ auth, popup, currency });
