export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_USER_DATA = 'SET_USER_DATA';

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
  payload: {
    userId: string;
    email: string;
    name: string;
    lastName: string;
    dateOfBirth: string | Date;
    country: string;
    city: string;
    address: string;
  };
}

export type AuthenticationActionTypes = AuthStart | AuthSuccess | AuthFailure | AuthLogout | SetUserData;
