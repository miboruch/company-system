import register from './register/register';
import logout from './logout/logout';
import tokens from './tokens/tokens';
import { combineReducers } from 'redux';

export const auth = combineReducers({ register, logout, tokens });
