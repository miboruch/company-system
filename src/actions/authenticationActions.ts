import axios from 'axios';
import { AUTH_FAILURE, AUTH_LOGOUT, AUTH_START, AUTH_SUCCESS, AuthenticationActionTypes, SET_NEW_ACCESS_TOKEN, SET_USER_DATA } from '../types/authenticationTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/appActionTypes';
import { API_URL } from '../utils/config';

const authStart = (): AuthenticationActionTypes => {
  return {
    type: AUTH_START
  };
};

const authSuccess = (token: string, refreshToken: string, userId: string, expireIn: number): AuthenticationActionTypes => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('expireDate', new Date(expireIn).toLocaleString());

  return {
    type: AUTH_SUCCESS,
    payload: {
      token,
      refreshToken,
      userId
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

const setNewAccessToken = (token: string, expireIn: number): AuthenticationActionTypes => {
  localStorage.setItem('token', token);
  localStorage.setItem('expireDate', new Date(expireIn).toLocaleString());

  return {
    type: SET_NEW_ACCESS_TOKEN,
    payload: {
      token
    }
  };
};

const getNewAccessToken = (refreshToken: string) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/token`, {
      refreshToken: refreshToken
    });

    dispatch(setNewAccessToken(data.accessToken, data.expireIn));
  } catch (error) {
    console.log(error);
  }
};

const authTimeout = (refreshToken: string, expireTime: number) => {
  return setTimeout(async () => {
    await getNewAccessToken(refreshToken);
    //expireTime - new Date().getTime() / 1000
  }, expireTime * 1000);
};

export const logout = (refreshToken: string) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    dispatch(authStart());
    await axios.delete(`${API_URL}/auth/logout`, {
      data: {
        refreshToken: refreshToken
      }
    });

    dispatch(authLogout());
  } catch (error) {
    console.log(error);
  }
};
