import { EmployeeDataInterface } from '../../../types/modelsTypes';
import { setSelectedEmployee, setEmployeeInfoOpen } from './employees-toggle';
import { AppDispatch } from '../../../store/store';

export const selectEmployee = (employee: EmployeeDataInterface | null) => (dispatch: AppDispatch): void => {
  dispatch(setSelectedEmployee(employee));
  dispatch(setEmployeeInfoOpen(!!employee));
};
