import axios from 'axios';
import {
  AUTH_FAILURE,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  SET_USER_DATA,
  SET_USER_ROLE,
  AuthFailure,
  AuthLogout,
  AuthStart,
  AuthSuccess,
  SetUserData,
  SetUserRole,
  UserRole
} from '../types/actionTypes/authenticationActionTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { API_URL } from '../utils/config';

const authStart = (): AuthStart => {
  return {
    type: AUTH_START
  };
};

const authSuccess = (token: string, refreshToken: string, expireIn: number): AuthSuccess => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('expireDate', new Date(expireIn).toLocaleString());

  return {
    type: AUTH_SUCCESS,
    payload: {
      token,
      refreshToken
    }
  };
};

const authFailure = (): AuthFailure => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expireDate');

  return {
    type: AUTH_FAILURE,
    payload: 'Niepoprawny email lub hasło'
  };
};

const authLogout = (): AuthLogout => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expireDate');

  return {
    type: AUTH_LOGOUT
  };
};

const setUserData = (userId: string, email: string, name: string, lastName: string, dateOfBirth: string | Date, country: string, city: string, address: string): SetUserData => {
  return {
    type: SET_USER_DATA,
    payload: {
      userId,
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

const getNewAccessToken = (refreshToken: string, successCallback?: () => void, errorCallback?: () => void) => async (dispatch: Dispatch<AppTypes | any>) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/token`, {
      refreshToken: refreshToken
    });

    dispatch(authSuccess(data.accessToken, refreshToken, data.expireIn));
    dispatch(getUserData(data.accessToken));
    !!successCallback && successCallback();
    dispatch(authTimeout(refreshToken, data.expireIn - new Date().getTime()));
  } catch (error) {
    console.log(error);
    !!errorCallback && errorCallback();
    dispatch(userLogout(refreshToken));
  }
};

const authTimeout = (refreshToken: string, expireMilliseconds: number) => (dispatch: Dispatch<AppTypes | any>) => {
  return setTimeout(async () => {
    dispatch(getNewAccessToken(refreshToken));
  }, expireMilliseconds);
};

export const setUserRole = (role: UserRole): SetUserRole => {
  return {
    type: SET_USER_ROLE,
    payload: role
  };
};

export const getUserData = (token: string) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    const { data } = await axios.get(`${API_URL}/user/user-data`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(setUserData(data._id, data.email, data.name, data.lastName, data.dateOfBirth, data.country, data.city, data.address));
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = (email: string, password: string, successCallback: () => void) => async (dispatch: Dispatch<AppTypes | any>) => {
  try {
    dispatch(authStart());

    const { data } = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });

    dispatch(authSuccess(data.token, data.refreshToken, data.expireIn));
    successCallback();

    const milliseconds = data.expireIn - new Date().getTime();
    dispatch(authTimeout(data.refreshToken, milliseconds));
  } catch (error) {
    dispatch(authFailure());
  }
};

export const userLogout = (refreshToken: string, successCallback?: () => void, errorCallback?: () => void) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    dispatch(authStart());
    await axios.post(`${API_URL}/auth/logout`, { refreshToken: refreshToken });

    dispatch(authLogout());
    !!successCallback && successCallback();
  } catch (error) {
    !!errorCallback && errorCallback();
    console.log(error);
  }
};

export const userRegister = (
  email: string,
  password: string,
  repeatedPassword: string,
  name: string,
  lastName: string,
  dateOfBirth: string | Date,
  phoneNumber: string,
  country: string,
  city: string,
  address: string
) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    dispatch(authStart());

    const { data } = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      repeatedPassword,
      name,
      lastName,
      dateOfBirth,
      phoneNumber,
      country,
      city,
      address
    });

    dispatch(authSuccess(data.token, data.refreshToken, data.expireIn));
  } catch (error) {
    dispatch(authFailure());
  }
};

export const authenticateCheck = (successCallback: () => void, errorCallback: () => void) => async (dispatch: Dispatch<AppTypes | any>) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const expireDate = localStorage.getItem('expireDate');

  if (token && refreshToken && expireDate) {
    dispatch(authStart());
    const expDate = new Date(expireDate);
    dispatch(getUserData(token));

    if (expDate <= new Date()) {
      dispatch(getNewAccessToken(refreshToken, successCallback, errorCallback));
    } else {
      dispatch(authSuccess(token, refreshToken, new Date(expireDate).getTime()));
      dispatch(getUserData(token));
      successCallback();
      dispatch(authTimeout(refreshToken, expDate.getTime() - new Date().getTime()));
    }
  } else {
    refreshToken ? dispatch(userLogout(refreshToken, errorCallback)) : dispatch(authLogout());
  }
};
