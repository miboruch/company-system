import axios from 'axios';
import testStore from '../store/test-store';

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
  const { token } = testStore.getState().auth.tokens;
  if (token) {
    authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    adminApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

const companyIdListener = () => {
  // const { currentCompany } = testStore.getState().companyReducer;
  // if (currentCompany) {
  //   adminApi.interceptors.request.use((config) => {
  //     config.params = config.params || {};
  //     config.params['company_id'] = currentCompany._id;
  //     return config;
  //   });
  // }
};

testStore.subscribe(tokenListener);
testStore.subscribe(companyIdListener);

export { api, authApi, adminApi };
