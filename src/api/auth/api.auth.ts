import fetchMiddleware from '../api.middleware';
import { EmployeeDataInterface } from 'types/modelsTypes';

// export const fetchEmployeeData = (token: string) => () => fetchMiddleware<EmployeeDataInterface>({ method: 'get', url: '/employee/employee-data', headers: { Authorization: `Bearer ${token}` } });
export const fetchEmployeeData = (token: string) =>
  fetchMiddleware<EmployeeDataInterface>({
    method: 'get',
    url: '/employee/employee-data',
    headers: { Authorization: `Bearer ${token}` }
  });

export interface LoginData {
  email: string;
  password: string;
}

export const login = (data: LoginData) =>
  fetchMiddleware<{ token: string; refreshToken: string; id: string }>({ method: 'post', url: '/auth/login', data });
