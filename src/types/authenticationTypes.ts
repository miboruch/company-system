export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_NEW_ACCESS_TOKEN = 'SET_NEW_ACCESS_TOKEN';
export const SET_USER_DATA = 'SET_USER_DATA';

export interface AuthStart {
  type: typeof AUTH_START;
}

export interface AuthSuccess {
  type: typeof AUTH_SUCCESS;
  payload: {
    token: string;
    refreshToken: string;
    userId: string;
  };
}

export interface AuthFailure {
  type: typeof AUTH_FAILURE;
  payload: string;
}

export interface AuthLogout {
  type: typeof AUTH_LOGOUT;
}

export interface SetNewAccessToken {
  type: typeof SET_NEW_ACCESS_TOKEN;
  payload: {
    token: string;
  };
}

export interface SetUserData {
  type: typeof SET_USER_DATA;
  payload: {
    email: string;
    name: string;
    lastName: string;
    dateOfBirth: string | Date;
    country: string;
    city: string;
    address: string;
  };
}

export type AuthenticationActionTypes = AuthStart | AuthSuccess | AuthFailure | AuthLogout | SetNewAccessToken | SetUserData;
