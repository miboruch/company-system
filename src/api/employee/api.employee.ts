import fetchMiddleware from 'api/api.middleware';
import { UserRole } from 'ducks/auth/roles/roles';
import { EmployeeModel, ParamsId } from 'types';

interface EmployeeReturn {
  employees: EmployeeModel[];
  employeesCounter: number;
}

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
