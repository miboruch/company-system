import fetchMiddleware from 'api/api.middleware';

export const validateRegistrationToken = (token: string) =>
  fetchMiddleware({ method: 'post', url: '/auth/verify-registration-token', data: { token } });

export interface RegisterInterface {
  email: string;
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

export const register = (data: RegisterInterface) => fetchMiddleware({ method: 'post', url: '/auth/register', data });
