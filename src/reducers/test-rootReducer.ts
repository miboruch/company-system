import { combineReducers, Reducer } from 'redux';
import { auth } from '../ducks/auth/auth';
import store, { AppState } from '../store/test-store';

export const testRootReducer = combineReducers({ auth });
