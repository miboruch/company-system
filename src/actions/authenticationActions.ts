import axios from 'axios';
import { AUTH_FAILURE, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, AuthenticationActionTypes, SET_USER_DATA } from '../types/authenticationTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/appActionTypes';
import { API_URL } from '../utils/config';

const authStart = (): AuthenticationActionTypes => {
  return {
    type: AUTH_START
  };
};

const authSuccess = (token: string, refreshToken: string, expireIn: number): AuthenticationActionTypes => {
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

const authFailure = (): AuthenticationActionTypes => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expireDate');

  return {
    type: AUTH_FAILURE,
    payload: 'Niepoprawny email lub hasło'
  };
};

const authLogout = (): AuthenticationActionTypes => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expireDate');

  return {
    type: AUTH_LOGOUT
  };
};

const setUserData = (
  userId: string,
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

const getNewAccessToken = (refreshToken: string) => async (dispatch: Dispatch<AppTypes | any>) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/token`, {
      refreshToken: refreshToken
    });

    dispatch(authSuccess(data.accessToken, refreshToken, data.expireIn));
    dispatch(getUserData(data.accessToken));
    dispatch(authTimeout(refreshToken, data.expireIn - new Date().getTime()));
  } catch (error) {
    console.log(error);
  }
};

const authTimeout = (refreshToken: string, expireMilliseconds: number) => (dispatch: Dispatch<AppTypes | any>) => {
  return setTimeout(async () => {
    dispatch(getNewAccessToken(refreshToken));
  }, expireMilliseconds);
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

export const userLogout = (refreshToken: string) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    dispatch(authStart());
    await axios.post(`${API_URL}/auth/logout`, { refreshToken: refreshToken });

    dispatch(authLogout());
  } catch (error) {
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

export const authenticateCheck = () => async (dispatch: Dispatch<AppTypes | any>) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const expireDate = localStorage.getItem('expireDate');

  if (token && refreshToken && expireDate) {
    dispatch(authStart());
    const expDate = new Date(expireDate);
    dispatch(getUserData(token));

    if (expDate <= new Date()) {
      dispatch(getNewAccessToken(refreshToken));
    } else {
      dispatch(authSuccess(token, refreshToken, new Date(expireDate).getTime()));
      dispatch(getUserData(token));
      dispatch(authTimeout(refreshToken, expDate.getTime() - new Date().getTime()));
    }
  } else {
    refreshToken ? dispatch(userLogout(refreshToken)) : dispatch(authLogout());
  }
};
