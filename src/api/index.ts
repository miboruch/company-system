import axios from 'axios';
import store from '../store/store';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const adminApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const tokenListener = () => {
  const { token } = store.getState().authenticationReducer;
  if (token) {
    authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    adminApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const companyIdListener = () => {
  const { currentCompany } = store.getState().companyReducer;
  if (currentCompany) {
    adminApi.interceptors.request.use((config) => {
      config.params = config.params || {};
      config.params['company_id'] = currentCompany._id;
      return config;
    });
  }
};

store.subscribe(tokenListener);
store.subscribe(companyIdListener);

export { api, authApi, adminApi };
