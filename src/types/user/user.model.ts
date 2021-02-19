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
