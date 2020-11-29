import axios from 'axios';
// import store from '../store/test-store';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export { api, authApi };
