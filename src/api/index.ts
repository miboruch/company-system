import axios from 'axios';
// import store from '../store/test-store';

//* not logged in
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

//* only logged in users
const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

//* users currently in company (employee + admin)
const companyApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const adminInterceptors = (refreshToken: string, companyId: string) => {
  console.log(refreshToken);
  console.log(companyId);
  return axios.interceptors.response.use(
    (response) => {
      console.log('you have access to it');
      console.log(response);
      return response;
    },
    (error) => {
      return new Promise((resolve, reject) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetryRequest) {
          console.log('you dont have access to it');
          originalRequest._isRetryRequest = true;

          console.log('im trying to get new admin token');
          const res = fetch(`${process.env.REACT_APP_API_URL}/company/admin-token`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify({
              refreshToken: localStorage.getItem('refreshToken'),
              companyId: companyId
            })
          })
            .then((res) => res.json())
            .then((response) => {
              console.log(response);
            });

          resolve(res);
        }

        return Promise.reject(error);
      });
    }
  );
};

export { api, authApi, companyApi };
