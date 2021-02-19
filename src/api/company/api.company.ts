import fetchMiddleware from 'api/api.middleware';
import { CompanyInterface } from 'types/modelsTypes';
type Token = string | null;

export const fetchAdminCompanies = (token: Token) => () =>
  fetchMiddleware<CompanyInterface[]>({
    method: 'get',
    url: '/user/get-user-companies',
    headers: { Authorization: `Bearer ${token}` }
  });

export const fetchEmployeeCompanies = (token: Token) => () =>
  fetchMiddleware<CompanyInterface[]>({
    method: 'get',
    url: '/employee/get-employee-companies',
    headers: { Authorization: `Bearer ${token}` }
  });
