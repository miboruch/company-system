import { combineReducers } from 'redux';
import account from './account/account';
import check from './check/check';
import data from './data/data';
import linkRegistration from './link-registration/link-registration';
import login from './login/login';
import logout from './logout/logout';
import register from './register/register';
import roles from './roles/roles';
import tokens from './tokens/tokens';

export const auth = combineReducers({ account, check, data, linkRegistration, login, logout, register, roles, tokens });
