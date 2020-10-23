import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { employeeReducer } from './employeeReducer';
import { companyReducer } from './companyReducer';

export const rootReducer = combineReducers({
  authenticationReducer,
  employeeReducer,
  companyReducer
});

export type AppState = ReturnType<typeof rootReducer>;
