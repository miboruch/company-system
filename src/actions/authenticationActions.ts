import axios from 'axios';
import {
  AUTH_FAILURE,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  AuthFailure,
  AuthLogout,
  AuthStart,
  AuthSuccess,
  SET_ALL_APP_USERS,
  SET_USER_DATA,
  SET_USER_ROLE,
  SetAllAppUsers,
  SetUserData,
  SetUserRole,
  UserRole
} from '../types/actionTypes/authenticationActionTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { API_URL } from '../utils/config';
import { UserDataInterface } from '../types/modelsTypes';
import { AppState } from '../store/test-store';
import { resetState, setNotificationMessage } from './toggleActions';
import { NotificationTypes } from '../types/actionTypes/toggleAcitonTypes';
import { RegistrationVerifyTokenResponse } from '../pages/RegisterFromLink/RegisterFromLink';

const authStart = (): AuthStart => {
  return {
    type: AUTH_START
  };
};

const authSuccess = (token: string, refreshToken: string, expireIn: number): AuthSuccess => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('expireDate', new Date(expireIn).toString());

  return {
    type: AUTH_SUCCESS,
    payload: {
      token,
      refreshToken
    }
  };
};

const authFailure = (message: string): AuthFailure => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expireDate');

  return {
    type: AUTH_FAILURE,
    payload: message
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

const setUserData = (userId: string, email: string, name: string, lastName: string, dateOfBirth: Date, phoneNumber: string, country: string, city: string, address: string): SetUserData => {
  return {
    type: SET_USER_DATA,
    payload: {
      userId,
      email,
      name,
      lastName,
      dateOfBirth,
      phoneNumber,
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
    dispatch(userLogout());
  }
};

const authTimeout = (refreshToken: string, expireMilliseconds: number) => (dispatch: Dispatch<AppTypes | any>) => {
  return setTimeout(async () => {
    dispatch(getNewAccessToken(refreshToken));
  }, expireMilliseconds);
};

const setAllAppUsers = (users: UserDataInterface[]): SetAllAppUsers => {
  return {
    type: SET_ALL_APP_USERS,
    payload: users
  };
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

    dispatch(setUserData(data._id, data.email, data.name, data.lastName, data.dateOfBirth, data.phoneNumber, data.country, data.city, data.address));
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
    dispatch(getUserData(data.token));
    successCallback();

    const milliseconds = data.expireIn - new Date().getTime();
    dispatch(authTimeout(data.refreshToken, milliseconds));
  } catch (error) {
    dispatch(authFailure(error.response.data));
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
    console.log(error.response);
  }
};

export const userLogout = (successCallback?: () => void, errorCallback?: () => void) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  try {
    dispatch(authStart());

    const { refreshToken } = getState().auth.tokens;
    if (refreshToken) {
      await axios.post(`${API_URL}/auth/logout`, { refreshToken: refreshToken });

      dispatch(authLogout());
      dispatch(resetState());
      !!successCallback && successCallback();
    }
  } catch (error) {
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
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
  dateOfBirth: Date,
  phoneNumber: string,
  country: string,
  city: string,
  address: string,
  callback: () => void
) => async (dispatch: Dispatch<any>) => {
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
    dispatch(getUserData(data.token));
    dispatch(setNotificationMessage('Utworzono nowe konto'));
    callback();

    const milliseconds = data.expireIn - new Date().getTime();
    dispatch(authTimeout(data.refreshToken, milliseconds));
  } catch (error) {
    dispatch(authFailure(error.response.data));
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
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
      dispatch(authTimeout(refreshToken, expDate.getTime() - new Date().getTime()));
      successCallback();
    }
  } else {
    if (refreshToken) {
      dispatch(userLogout(errorCallback));
    } else {
      dispatch(authLogout());
      dispatch(resetState());
      errorCallback();
    }
  }
};

//TODO

export const getAllAppUsers = () => async (dispatch: Dispatch<AppTypes>, getState: () => AppState) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      const { data } = await axios.get(`${API_URL}/user/get-all-users-except-company-owners?company_id${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setAllAppUsers(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendRegistrationMail = (email: string, pricePerHour?: number, monthlyPrice?: number) => async (dispatch: Dispatch<AppTypes>, getState: () => AppState) => {
  const { token } = getState().auth.tokens;
  const { currentCompany } = getState().companyReducer;

  try {
    if (token && currentCompany) {
      const data = {
        email,
        pricePerHour,
        monthlyPrice,
        companyName: currentCompany.name
      };

      await axios.post(`${API_URL}/auth/send-registration-link?company_id=${currentCompany._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  } catch (error) {
    console.log(error);
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};

export const validateRegistrationToken = (token: string, setLoading: (isLoading: boolean) => void, setResponse: (response: RegistrationVerifyTokenResponse) => void) => async (
  dispatch: Dispatch<any>
) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/verify-registration-token`, {
      token
    });
    console.log(data);
    setResponse(data);
    setLoading(false);
    dispatch(setNotificationMessage('Token prawidłowy'));
  } catch (error) {
    setLoading(false);
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};

export const registerFromLink = (
  token: string,
  password: string,
  repeatedPassword: string,
  name: string,
  lastName: string,
  dateOfBirth: Date,
  phoneNumber: string,
  country: string,
  city: string,
  address: string,
  callback: () => void
) => async (dispatch: Dispatch<any>) => {
  dispatch(authStart());

  try {
    const { data } = await axios.post(`${API_URL}/auth/register-from-link`, {
      token,
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
    dispatch(setNotificationMessage('Utworzono nowe konto'));
    callback();

    const milliseconds = data.expireIn - new Date().getTime();
    dispatch(authTimeout(data.refreshToken, milliseconds));
  } catch (error) {
    dispatch(authFailure(error.response.data));
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};

export const editAccount = (email: string, name: string, lastName: string, dateOfBirth: Date, phoneNumber: string, address: string, city: string, country: string) => async (
  dispatch: Dispatch<any>,
  getState: () => AppState
) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      await axios.put(
        `${API_URL}/user/edit-user`,
        {
          email,
          name,
          lastName,
          dateOfBirth,
          phoneNumber,
          address,
          city,
          country
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(getUserData(token));
      dispatch(setNotificationMessage('Edytowano dane'));
    }
  } catch (error) {
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};

//===

export const editPassword = (password: string, repeatedPassword: string) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().auth.tokens;

  try {
    if (token) {
      await axios.put(
        `${API_URL}/user/password-edit`,
        {
          password,
          repeatedPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(setNotificationMessage('Hasło zostało zmienione'));
    }
  } catch (error) {
    dispatch(setNotificationMessage(error.response.data, NotificationTypes.Error));
  }
};
