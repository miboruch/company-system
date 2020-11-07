import { AuthenticationActionTypes } from './authenticationActionTypes';
import { EmployeesActionTypes } from './employeesActionTypes';
import { CompanyActionTypes } from './companyActionTypes';
import { TaskActionTypes } from './taskActionTypes';
import { ClientActionTypes } from './clientActionTypes';
import { AttendanceActionTypes } from './attendanceActionTypes';
import { ToggleActionTypes } from './toggleAcitonTypes';
import { FinanceActionTypes } from './financeActionTypes';
import { NotificationActionTypes } from './notificationActionTypes';

export type AppTypes =
  | AuthenticationActionTypes
  | EmployeesActionTypes
  | CompanyActionTypes
  | TaskActionTypes
  | ClientActionTypes
  | AttendanceActionTypes
  | ToggleActionTypes
  | FinanceActionTypes
  | NotificationActionTypes;
