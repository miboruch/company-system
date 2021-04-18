import fetchMiddleware from 'api/api.middleware';

import { UserRole } from 'ducks/auth/roles/roles';
import { EmployeeModel, ParamsId } from 'types';

interface EmployeeReturn {
  employees: EmployeeModel[];
  employeesCounter: number;
}

export const fetchEmployees = (role: UserRole) => () =>
  fetchMiddleware<EmployeeReturn>({ method: 'get', url: role === UserRole.Admin ? `/employee/company` : `/employee/current` });

export const fetchSingleEmployee = (id: ParamsId) => () =>
  fetchMiddleware<EmployeeModel>({ method: 'get', url: `/employee/${id}` });

export interface AddEmployeeData {
  userId: string;
  pricePerHour: number;
  monthlyPrice: number;
}

export const postEmployee = (data: UpdateEmployeeData) => fetchMiddleware({ method: 'post', url: `/employee`, data });

export interface UpdateEmployeeData {
  hourSalary?: number;
  monthlySalary?: number;
}

export const updateEmployee = (id: ParamsId) => (data: UpdateEmployeeData) =>
  fetchMiddleware({ method: 'put', url: `/employee/${id}`, data });

export const deleteEmployee = (id: ParamsId) => fetchMiddleware({ method: 'put', url: `/employee/${id}` });
