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
