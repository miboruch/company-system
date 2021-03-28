import { setSelectedEmployee, setEmployeeInfoOpen } from './employees-toggle';

import { EmployeeModel } from 'types';
import { AppDispatch } from 'store/store';

export const selectEmployee = (employee: EmployeeModel | null) => (dispatch: AppDispatch): void => {
  dispatch(setSelectedEmployee(employee));
  dispatch(setEmployeeInfoOpen(!!employee));
};
