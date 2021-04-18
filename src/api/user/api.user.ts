import fetchMiddleware from 'api/api.middleware';
import { UserAuthModel, UserModel } from 'types';

export const fetchUserData = () => fetchMiddleware<UserAuthModel>({ method: 'get', url: '/user' });

export const fetchAppUsers = () => fetchMiddleware<UserModel[]>({ method: 'get', url: '/user/app' });

export interface EditAccountData {
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

export const putUserData = (data: EditAccountData) => fetchMiddleware({ method: 'put', url: '/user', data });

interface EditPasswordData {
  password: string;
  repeatedPassword: string;
}

export const putUserPassword = (data: EditPasswordData) => fetchMiddleware({ method: 'put', url: '/user/password', data });
