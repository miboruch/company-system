import fetchMiddleware from 'api/api.middleware';

interface RegisterCommonData {
  password: string;
  repeatedPassword: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
}

export const validateRegistrationToken = (token: string) =>
  fetchMiddleware({ method: 'post', url: '/auth/verify-registration-token', data: { token } });

export interface RegisterInterface extends RegisterCommonData {
  email: string;
}

export const register = (data: RegisterInterface) => fetchMiddleware({ method: 'post', url: '/auth/register', data });

export interface LinkRegisterInterface extends RegisterCommonData {
  token: string;
}

export const linkRegister = (data: LinkRegisterInterface) =>
  fetchMiddleware({ method: 'post', url: '/auth/link-register', data });
