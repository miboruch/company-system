import fetchMiddleware from 'api/api.middleware';

import { EmployeeModel, ParamsId } from 'types';

interface EmployeeReturn {
  employees: EmployeeModel[];
  employeesCounter: number;
}

export const fetchEmployees = () => fetchMiddleware<EmployeeReturn>({ method: 'get', url: `/employee/company` });

export const fetchOwnEmployeeData = () => fetchMiddleware<EmployeeReturn>({ method: 'get', url: `/employee/current` });

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
