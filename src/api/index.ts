import axios from 'axios';
import store from '../store/test-store';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

(function () {
  const { token } = store.getState().auth.tokens;
  if (token) {
    authApi.defaults.headers.common['Authorization'] = token;
  } else {
    authApi.defaults.headers.common['Authorization'] = null;
  }
})();

export { api, authApi };
