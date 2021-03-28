import fetchMiddleware from 'api/api.middleware';
import { CompanyInterface } from 'types/modelsTypes';
type Token = string | null;

export const fetchAdminCompanies = (token: Token) => () =>
  fetchMiddleware<CompanyInterface[]>({
    method: 'get',
    url: '/user/companies',
    // headers: { Authorization: `Bearer ${token}` }
  });

export const fetchEmployeeCompanies = (token: Token) => () =>
  fetchMiddleware<CompanyInterface[]>({
    method: 'get',
    url: '/employee/companies',
    // headers: { Authorization: `Bearer ${token}` }
  });

export interface PostCompanyData {
  name: string;
  nip: string;
  address: string;
  lat: number;
  long: number;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
}

export const postCompany = (data: PostCompanyData) =>
  fetchMiddleware({
    method: 'post',
    url: '/company',
    data
  });
