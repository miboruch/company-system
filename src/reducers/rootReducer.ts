import { combineReducers } from 'redux';
import { authenticationReducer } from './authenticationReducer';

export const rootReducer = combineReducers({
  authenticationReducer
});

export type AppState = ReturnType<typeof rootReducer>;
