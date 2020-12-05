import { AppDispatch } from '../../store/store';

import { resetAttendanceToggle, setSelectedAttendance } from '../attendance/attendance-toggle/attendance-toggle';
import { resetAttendanceData } from '../attendance/attendance-data/attendance-data';
import { resetClientData } from '../client/client-data/client-data';
import { resetClientToggle, setSelectedClient } from '../client/client-toggle/client-toggle';
import { resetCompanies } from '../company/companies/companies';
import { resetCompanyOwners } from '../company/company-owners/company-owners';
import { resetCompanyToggle } from '../company/company-toggle/company-toggle';
import { resetCurrentCompany } from '../company/current-company/current-company';
import { resetEmployeesData } from '../employees/employees-data/employees-data';
import { resetEmployeesToggle, setSelectedEmployee } from '../employees/employees-toggle/employees-toggle';
import { resetBudget } from '../finances/budget/budget';
import { resetIncomeExpense } from '../finances/income-expense/income-expense';
import { resetTasksData } from '../tasks/tasks-data/tasks-data';
import { resetTaskToggle, setSelectedTask } from '../tasks/tasks-toggle/tasks-toggle';
import { selectAttendance } from '../attendance/attendance-toggle/attendance-toggle-creators';
import { resetWeekAttendanceData } from '../attendance/week-attendance-data/week-attendance-data';
import { resetAllUsersState } from '../users/all-users';

const resetAttendanceState = () => (dispatch: AppDispatch): void => {
  dispatch(resetAttendanceToggle());
  dispatch(resetAttendanceData());
  dispatch(resetWeekAttendanceData());
};

const resetClientState = () => (dispatch: AppDispatch): void => {
  dispatch(resetClientData());
  dispatch(resetClientToggle());
};

const resetCompanyState = () => (dispatch: AppDispatch): void => {
  dispatch(resetCompanies());
  dispatch(resetCompanyOwners());
  dispatch(resetCompanyToggle());
  dispatch(resetCurrentCompany());
};

const resetEmployeeState = () => (dispatch: AppDispatch): void => {
  dispatch(resetEmployeesData());
  dispatch(resetEmployeesToggle());
};

const resetBudgetState = () => (dispatch: AppDispatch): void => {
  dispatch(resetBudget());
  dispatch(resetIncomeExpense());
};

const resetTaskState = () => (dispatch: AppDispatch): void => {
  dispatch(resetTasksData());
  dispatch(resetTaskToggle());
};

const resetUsersState = () => (dispatch: AppDispatch): void => {
  dispatch(resetAllUsersState());
};

export const resetAllSelected = () => (dispatch: AppDispatch): void => {
  dispatch(setSelectedEmployee(null));
  dispatch(setSelectedClient(null));
  dispatch(setSelectedTask(null));
  dispatch(setSelectedAttendance(null));
  dispatch(selectAttendance(null));
};

export const resetState = () => (dispatch: AppDispatch): void => {
  dispatch(resetAttendanceState());
  dispatch(resetClientState());
  dispatch(resetCompanyState());
  dispatch(resetEmployeeState());
  dispatch(resetBudgetState());
  dispatch(resetTaskState());
  dispatch(resetUsersState());
};
