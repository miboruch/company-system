import axios from 'axios';
import store from '../store/test-store';
import { clearStorage, logout } from '../ducks/auth/logout/logout-creators';
import { resetState } from '../ducks/reset/reset-creators';

export const handleAuthRefreshToken = (error: any) => {
  console.log('handle auth refresh token because of 401');
  const originalRequest = error.config;
  const status = error?.response?.status;
  const isAuthorizationError = status === 401;
  if (isAuthorizationError && originalRequest.url.includes('/auth/company-token')) {
    history.pushState({}, '', '/login');
    return Promise.reject(error);
  }
  if (isAuthorizationError && !originalRequest._isRetryRequest) {
    originalRequest._isRetryRequest = true;

    return axios
      .post(`${process.env.REACT_APP_API_URL}/auth/token`, {
        refreshToken: localStorage.getItem('refreshToken')
      })
      .then((res) => {
        const token = res?.data?.accessToken;
        if (token) {
          console.log(`new auth token: ${token}`);
          localStorage.setItem('token', token);
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        } else {
          //TODO: logout
        }
      })
      .catch((error) => {
        //TODO: logout
      });
  }

  return Promise.reject(error);
};

export const handleCompanyRefreshToken = (error: any) => {
  console.log('handle company refresh token because of 401');
  const originalRequest = error.config;
  const status = error?.response?.status;
  const isAuthorizationError = status === 401;
  if (isAuthorizationError && originalRequest.url.includes('/auth/company-token')) {
    history.pushState({}, '', '/login');
    return Promise.reject(error);
  }
  if (isAuthorizationError && !originalRequest._isRetryRequest) {
    originalRequest._isRetryRequest = true;

    const refreshToken = localStorage.getItem('refreshToken')

    return axios
      .post(`${process.env.REACT_APP_API_URL}/auth/company-token`, {
        refreshToken: refreshToken,
        companyId: localStorage.getItem('companyId')
      })
      .then((res) => {
        const token = res?.data?.accessToken;
        if (token) {
          console.log(`new admin and employee token: ${token}`);
          localStorage.setItem('token', token);
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        } else {
          console.log('no access token returned');

          if(refreshToken){
            store.dispatch(logout(() => history.pushState({}, '', '/login')));
          }else{
            store.dispatch(clearStorage());
            store.dispatch(resetState());
            history.pushState({}, '', '/login')
          }
          //TODO: logout
        }
      })
      .catch((error) => {
        //TODO: logout
        console.log('error');
      });
  }

  return Promise.reject(error);
};
