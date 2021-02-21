import { UserDataInterface } from 'types/modelsTypes';

export interface Employee {
  _id: string;
  userId: UserDataInterface;
  pricePerHour?: number;
  monthlyPrice?: number;
  companyId: string;
}
