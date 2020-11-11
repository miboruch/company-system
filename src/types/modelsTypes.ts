export interface CompanyInterface {
  address: string;
  city: string;
  country: string;
  createdDate: string | Date;
  email: string;
  lat: number;
  long: number;
  name: string;
  nip: string;
  owners: Array<string>;
  phoneNumber: string;
  _id: string;
}

export interface CompanyOwnersInterface {
  _id: string;
  email: string;
  name: string;
  lastName: string;
}

export interface IncomeDataInterface {
  createdDate: string | Date;
  _id: string;
  companyId: string;
  incomeValue: number;
  description: string;
}

export interface ExpenseDataInterface {
  createdDate: string | Date;
  _id: string;
  companyId: string;
  incomeValue: number;
  description: string;
}

export interface UserDataInterface {
  createdDate: string | Date;
  _id: string;
  role: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
}

export interface UserAuthData {
  userId: string;
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
}

export interface EmployeeDataInterface {
  _id: string;
  userId: UserDataInterface;
  pricePerHour?: number;
  monthlyPrice?: number;
  companyId: string;
}

export interface TaskInterface {
  isCompleted: boolean;
  addedDate: Date | string;
  _id: string;
  date: Date;
  timeEstimate: number;
  name: string;
  description: string;
  clientId?: null | string;
  companyId: string;
  taskIncome?: number;
  taskExpense?: number;
}

export interface ClientInterface {
  createdDate: Date;
  _id: string;
  name: string;
  companyId: string;
  address: string;
  lat: number;
  long: number;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
}

interface Attendance {
  _id: string;
  userId: string;
  date: Date;
  companyId: string;
  wasPresent: boolean;
  hours: number;
}

export interface WeekAttendance {
  userId: string | null;
  date: Date;
  wasPresent: boolean | null;
  hours: number | null;
}

interface AttendanceUserInterface {
  _id: string;
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
}

export interface AttendanceInterface {
  _id: string;
  pricePerHour: number;
  companyId: string;
  attendance?: Attendance;
  user: AttendanceUserInterface;
}

export interface NotificationInterface {
  userId: string;
  title: string;
  description: string;
  wasOpened: boolean;
  createdDate: Date;
}

export interface CompanyBudgetInterface {
  budget: number;
  _id: string;
  companyId: string;
}

interface IncomeExpenseInterface {
  createdDate: Date;
  _id: string;
  companyId: string;
  description: string;
}

export interface IncomeInterface extends IncomeExpenseInterface {
  incomeValue: number;
  expenseValue?: never;
}

export interface ExpenseInterface extends IncomeExpenseInterface {
  expenseValue: number;
  incomeValue?: never;
}

export interface NotificationInterface {
  userId: string;
  title: string;
  description: string;
  wasOpened: boolean;
  createdDate: Date;
}
