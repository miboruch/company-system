import fetchMiddleware from 'api/api.middleware';
import { CompanyModel } from 'types';

export const fetchAdminCompanies = () =>
  fetchMiddleware<CompanyModel[]>({
    method: 'get',
    url: '/user/companies'
  });

export const fetchEmployeeCompanies = () =>
  fetchMiddleware<CompanyModel[]>({
    method: 'get',
    url: '/employee/companies'
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
