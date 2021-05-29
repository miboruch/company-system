import fetchMiddleware from 'api/api.middleware';
import { CompanyModel, Coords } from 'types';

export const fetchAdminCompanies = () => fetchMiddleware<CompanyModel[]>({ method: 'get', url: '/user/companies' });

export const fetchEmployeeCompanies = () => fetchMiddleware<CompanyModel[]>({ method: 'get', url: '/employee/companies' });

interface Companies {
  _id: string;
  companyId: CompanyModel;
}

export const fetchUserCompanies = () => fetchMiddleware<Companies[]>({ method: 'get', url: '/company' });

export const fetchSingleCompany = (companyId: string) => () =>
  fetchMiddleware<CompanyModel>({ method: 'get', url: `/company/${companyId}` });

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

export const postCompany = (data: PostCompanyData) => fetchMiddleware({ method: 'post', url: '/company', data });

export interface EditCompanyData {
  name: string;
  email: string;
  nip: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
}

export const putCompany = (data: EditCompanyData) => fetchMiddleware({ method: 'put', url: `/company`, data });

export const putCompanyCoords = (data: Coords) => fetchMiddleware({ method: 'put', url: `/company/coords`, data });

export const deleteCompany = () => fetchMiddleware({ method: 'delete', url: `/company` });
