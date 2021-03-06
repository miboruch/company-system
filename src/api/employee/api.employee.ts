import { UserRole } from 'ducks/auth/roles/roles';
import fetchMiddleware from 'api/api.middleware';
import { EmployeeModel } from 'types';

interface EmployeeReturn {
  employees: EmployeeModel[];
  employeesCounter: number;
}

export const fetchEmployees = (role: UserRole) => () =>
  fetchMiddleware<EmployeeReturn>({
    method: 'get',
    url: role === UserRole.Admin ? `/employee/get-company-employees` : `/employee/employee-data`
  });
