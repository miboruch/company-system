import fetchMiddleware from '../api.middleware';

export interface LoginData {
  email: string;
  password: string;
}

export const login = (data: LoginData) =>
  fetchMiddleware<{ token: string; refreshToken: string; id: string }>({ method: 'post', url: '/auth/login', data });
