import fetchMiddleware from 'api/api.middleware';
import { UserAuthModel } from 'types';

export const fetchUserData = () => fetchMiddleware<UserAuthModel>({ method: 'get', url: '/user' });

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
