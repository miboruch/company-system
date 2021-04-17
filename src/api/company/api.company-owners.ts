import fetchMiddleware from 'api/api.middleware';
import { CompanyOwnersModel } from 'types';

export const fetchCompanyOwners = () => fetchMiddleware<CompanyOwnersModel[]>({ method: 'get', url: '/company/owners' });

interface CompanyOwnerData {
  toBeOwnerId: string;
}

export const postCompanyOwner = (data: CompanyOwnerData) => fetchMiddleware({ method: 'post', url: '/company/owner', data });

interface DeleteOwnerData {
  addEmployee: boolean;
  pricePerHour?: number;
  monthlyPrice?: number;
}

export const deleteCompanyOwner = (userId: string) => (data: DeleteOwnerData) =>
  fetchMiddleware({ method: 'delete', url: `/company/owner/${userId}`, data });
