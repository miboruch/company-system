import axios from 'axios';

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

export { api, authApi, companyApi };

export * from './auth/api.auth';
export * from './auth/api.register';

export * from './client/api.client';
export * from './company/api.company';
export * from './employee/api.employee';
export * from './tasks/api.tasks';
export * from './user/api.user';
export * from './attendance/api.attendance';
