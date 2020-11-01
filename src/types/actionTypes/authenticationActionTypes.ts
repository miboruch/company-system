import { UserAuthData, UserDataInterface } from '../modelsTypes';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_ROLE = 'SET_USER_ROLE';
export const SET_ALL_APP_USERS = 'SET_ALL_APP_USERS';

export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

export interface AuthStart {
  type: typeof AUTH_START;
}

export interface AuthSuccess {
  type: typeof AUTH_SUCCESS;
  payload: {
    token: string;
    refreshToken: string;
  };
}

export interface AuthFailure {
  type: typeof AUTH_FAILURE;
  payload: string;
}

export interface AuthLogout {
  type: typeof AUTH_LOGOUT;
}

export interface SetUserData {
  type: typeof SET_USER_DATA;
  payload: UserAuthData;
}

export interface SetUserRole {
  type: typeof SET_USER_ROLE;
  payload: UserRole;
}

export interface SetAllAppUsers {
  type: typeof SET_ALL_APP_USERS;
  payload: UserDataInterface[];
}

export type AuthenticationActionTypes = AuthStart | AuthSuccess | AuthFailure | AuthLogout | SetUserData | SetUserRole | SetAllAppUsers;
