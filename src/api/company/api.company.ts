import fetchMiddleware from 'api/api.middleware';
import { CompanyInterface } from 'types/modelsTypes';

export const fetchAdminCompanies = () =>
  fetchMiddleware<CompanyInterface[]>({
    method: 'get',
    url: '/user/companies',
  });

export const fetchEmployeeCompanies = () =>
  fetchMiddleware<CompanyInterface[]>({
    method: 'get',
    url: '/employee/companies',
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
