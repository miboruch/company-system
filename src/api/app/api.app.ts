import fetchMiddleware from 'api/api.middleware';
import { UserDataInterface } from 'types/modelsTypes';

export const fetchAppUsers = () =>
  fetchMiddleware<UserDataInterface[]>({
    method: 'get',
    url: '/user/app-users'
  });
