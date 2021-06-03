import { combineReducers } from 'redux';
import check from './check/check';
import logout from './logout/logout';
import register from './register/register';
import roles from './roles/roles';
import tokens from './tokens/tokens';

export const auth = combineReducers({ check, logout, register, roles, tokens });
