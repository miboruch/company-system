import axios from 'axios';
import store from '../store/store';
import { clearStorage, logout } from '../ducks/auth/logout/logout-creators';
import { resetState } from '../ducks/reset/reset-creators';
import { setNotificationMessage } from '../ducks/popup/popup';
import { NotificationTypes } from '../types/globalTypes';

const logoutUser = (refreshToken: string | null) => {
  if (refreshToken) {
    store.dispatch(logout(() => history.pushState({}, '', '/login')));
  } else {
    store.dispatch(clearStorage());
    store.dispatch(resetState());
    history.pushState({}, '', '/login');
  }
};

export const handleAuthRefreshToken = (error: any) => {
  const originalRequest = error.config;
  const status = error?.response?.status;
  const isAuthorizationError = status === 401;
  if (isAuthorizationError && originalRequest.url.includes('/auth/company-token')) {
    history.pushState({}, '', '/login');
    return Promise.reject(error);
  }
  if (isAuthorizationError && !originalRequest._isRetryRequest) {
    originalRequest._isRetryRequest = true;

    const refreshToken = localStorage.getItem('refreshToken');

    return axios
      .post(`${process.env.REACT_APP_API_URL}/auth/token`, {
        refreshToken: refreshToken
      })
      .then((res) => {
        const token = res?.data?.accessToken;
        if (token) {
          localStorage.setItem('token', token);
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        }
      })
      .catch((error) => {
        store.dispatch(setNotificationMessage({ message: 'Nie masz dostępu do tej akcji', notificationType: NotificationTypes.Error }));
        logoutUser(refreshToken);
      });
  }

  return Promise.reject(error);
};

export const handleCompanyRefreshToken = (error: any): Promise<any> => {
  const originalRequest = error.config;
  const status = error?.response?.status;
  const isAuthorizationError = status === 401;

  if (isAuthorizationError && originalRequest.url.includes('/auth/company-token')) {
    history.pushState({}, '', '/login');
    return Promise.reject(error);
  }
  if (isAuthorizationError && !originalRequest._isRetryRequest) {
    originalRequest._isRetryRequest = true;

    const refreshToken = localStorage.getItem('refreshToken');

    return axios
      .post(`${process.env.REACT_APP_API_URL}/auth/company-token`, {
        refreshToken: refreshToken,
        companyId: localStorage.getItem('companyId')
      })
      .then((res) => {
        const token = res?.data?.accessToken;
        if (token) {
          localStorage.setItem('token', token);
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        }
      })
      .catch((error) => {
        store.dispatch(setNotificationMessage({ message: 'Nie masz dostępu do tej akcji', notificationType: NotificationTypes.Error }));
        logoutUser(refreshToken);
      });
  }

  return Promise.reject(error);
};
