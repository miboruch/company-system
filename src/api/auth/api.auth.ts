import fetchMiddleware from '../api.middleware';

import {
  RegistrationVerifyToken,
  RegisterData,
  LinkRegisterData,
  MailRegistrationData,
  MailRegistrationResposne
} from 'types/auth/auth.model';
import { UserModel } from 'types';

type AuthResponse = { token: string; refreshToken: string; id: string; user: UserModel };

export interface LoginData {
  email: string;
  password: string;
}

export const login = (data: LoginData) => fetchMiddleware<AuthResponse>({ method: 'post', url: '/auth/login', data });

export const register = (data: RegisterData) => fetchMiddleware<AuthResponse>({ method: 'post', url: '/auth/register', data });

export const linkRegister = (data: LinkRegisterData) =>
  fetchMiddleware<AuthResponse>({ method: 'post', url: '/auth/link-register', data });

export const logout = (data: { refreshToken: string }) => fetchMiddleware({ method: 'post', url: '/auth/logout', data });

export const sendRegistrationMail = (data: MailRegistrationData) =>
  fetchMiddleware<MailRegistrationResposne>({ method: 'post', url: '/auth/send-registration-link', data });

export const verifyRegistrationToken = (data: { token: string }) =>
  fetchMiddleware<RegistrationVerifyToken>({ method: 'post', url: '/auth/verify-registration-token', data });
