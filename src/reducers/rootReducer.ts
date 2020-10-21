import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { employeeReducer } from './employeeReducer';

export const rootReducer = combineReducers({
  authenticationReducer,
  employeeReducer
});

export type AppState = ReturnType<typeof rootReducer>;
