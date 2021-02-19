import { UserDataInterface } from 'types/modelsTypes';

export interface EmployeeDataInterface {
  _id: string;
  userId: UserDataInterface;
  pricePerHour?: number;
  monthlyPrice?: number;
  companyId: string;
}
