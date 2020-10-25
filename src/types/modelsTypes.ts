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

export interface IncomeDataInterface {
  createdDate: string | Date;
  _id: string;
  companyId: string;
  incomeValue: number;
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
  dateOfBirth: Date | string;
  country: string;
  city: string;
  address: string;
}

export interface EmployeeDataInterface {
  _id: string;
  userId: UserDataInterface;
  pricePerHour?: number;
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

interface UserDataInAttendance {
  _id: string;
  email: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface AttendanceInterface {
  _id: string;
  userId: UserDataInAttendance;
  date: Date;
  companyId: string;
  wasPresent: boolean;
  hours: number;
}
