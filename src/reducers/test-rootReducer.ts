import { combineReducers } from 'redux';
import login from '../ducks/auth/login/login';

export const testRootReducer = combineReducers({ login });
