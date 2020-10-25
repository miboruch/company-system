import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';
import { employeeReducer } from './employeeReducer';
import { companyReducer } from './companyReducer';
import { taskReducer } from './taskReducer';
import { clientReducer } from './clientReducer';

export const rootReducer = combineReducers({
  authenticationReducer,
  employeeReducer,
  companyReducer,
  taskReducer,
  clientReducer
});

export type AppState = ReturnType<typeof rootReducer>;
