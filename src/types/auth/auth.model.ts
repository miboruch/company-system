export interface AuthModel {
  password: string;
  repeatedPassword: string;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
}

export interface RegisterData extends AuthModel {
  email: string;
}

export interface LinkRegisterData extends AuthModel {
  token: string;
}

export interface MailRegistrationData {
  email: string;
  pricePerHour?: number;
  monthlyPrice?: number;
  companyName: string;
}

export interface MailRegistrationResposne extends MailRegistrationData {
  companyId: string;
}

interface RegistrationTokenResponse {
  companyId: string;
  companyName: string;
  email: string;
  iat: number;
  exp: number;
}

interface RegistrationTokenHourPrice extends RegistrationTokenResponse {
  pricePerHour: number;
  monthlyPrice?: never;
}

interface RegistrationTokenMonthlyPrice extends RegistrationTokenResponse {
  pricePerHour?: never;
  monthlyPrice: number;
}

export type RegistrationVerifyToken = RegistrationTokenHourPrice | RegistrationTokenMonthlyPrice;
