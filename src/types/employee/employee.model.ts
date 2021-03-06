import { UserDataInterface } from 'types/modelsTypes';

export interface EmployeeModel {
  _id: string;
  userId: UserDataInterface;
  pricePerHour?: number;
  monthlyPrice?: number;
  companyId: string;
}
