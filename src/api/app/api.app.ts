import fetchMiddleware from 'api/api.middleware';
import { UserModel } from 'types';

export const fetchAppUsers = () =>
  fetchMiddleware<UserModel[]>({
    method: 'get',
    url: '/user/app-users'
  });
