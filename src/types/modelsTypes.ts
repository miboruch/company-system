export interface CompanyInterface {
  address: string;
  city: string;
  country: string;
  createdDate: string | Date;
  email: string;
  lat: number;
  long: number;
  name: string;
  nip: string
  owners: Array<string>;
  phoneNumber: string;
  _id: string;
}
