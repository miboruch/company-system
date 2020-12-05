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
