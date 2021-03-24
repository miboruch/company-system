import fetchMiddleware from 'api/api.middleware';
import { UserRole } from 'ducks/auth/roles/roles';
import { EmployeeModel, ParamsId } from 'types';

interface EmployeeReturn {
  employees: EmployeeModel[];
  employeesCounter: number;
}

/**
 * @get
 */

export const fetchEmployees = (role: UserRole) => () =>
  fetchMiddleware<EmployeeReturn>({
    method: 'get',
    url: role === UserRole.Admin ? `/employee/company` : `/employee/current`
  });

export const fetchSingleEmployee = (id: ParamsId) => () =>
  fetchMiddleware<EmployeeModel>({
    method: 'get',
    url: `/employee/${id}`
  });

/**
 * @post
 */

/**
 * @put
 */

export interface EmployeeUpdate {
  hourSalary?: number;
  monthlySalary?: number;
}

export const updateEmployee = (id: ParamsId) => (data: EmployeeUpdate) =>
  fetchMiddleware({
    method: 'put',
    url: `/employee/${id}`,
    data
  });

/**
 * @delete
 */
