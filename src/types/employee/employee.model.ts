import { UserModel } from 'types/user/user.model';

export interface EmployeeModel {
  _id: string;
  userId: UserModel;
  pricePerHour?: number;
  monthlyPrice?: number;
  companyId: string;
}
