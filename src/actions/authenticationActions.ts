import { AUTH_FAILURE, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, AuthenticationActionTypes, SET_USER_DATA } from '../types/authenticationTypes';

const authStart = (): AuthenticationActionTypes => {
  return {
    type: AUTH_START
  };
};

const authSuccess = (accessToken: string, refreshToken: string, userId: string): AuthenticationActionTypes => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('userId', userId);

  return {
    type: AUTH_SUCCESS,
    payload: {
      accessToken,
      refreshToken,
      userId
    }
  };
};

const authFailure = (): AuthenticationActionTypes => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userId');

  return {
    type: AUTH_FAILURE,
    payload: 'Niepoprawny email lub hasło'
  };
};

const authLogout = (refreshToken: string): AuthenticationActionTypes => {
  return {
    type: AUTH_LOGOUT,
    payload: {
      refreshToken
    }
  };
};

const setUserData = (
  email: string,
  name: string,
  lastName: string,
  dateOfBirth: string | Date,
  country: string,
  city: string,
  address: string
): AuthenticationActionTypes => {
  return {
    type: SET_USER_DATA,
    payload: {
      email,
      name,
      lastName,
      dateOfBirth,
      country,
      city,
      address
    }
  };
};
