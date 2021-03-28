export interface CompanyModel {
  address: string;
  city: string;
  country: string;
  createdDate: string | Date;
  email: string;
  lat: number;
  long: number;
  name: string;
  nip: string;
  owners: string[];
  phoneNumber: string;
  _id: string;
}

export interface CompanyOwnersModel {
  _id: string;
  email: string;
  name: string;
  lastName: string;
}
