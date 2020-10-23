import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { employeeReducer } from './employeeReducer';
import { companyReducer } from './companyReducer';
import { taskReducer } from './taskReducer';

export const rootReducer = combineReducers({
  authenticationReducer,
  employeeReducer,
  companyReducer,
  taskReducer
});

export type AppState = ReturnType<typeof rootReducer>;
