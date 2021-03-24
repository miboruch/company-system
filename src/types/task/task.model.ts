import { ClientModel, EmployeeModel } from 'types';

export interface TaskModel {
  isCompleted: boolean;
  addedDate: Date | string;
  _id: string;
  date: Date;
  timeEstimate: number;
  name: string;
  description: string;
  employees: EmployeeModel[];
  clientId?: ClientModel | null;
  companyId: string;
  taskIncome?: number;
  taskExpense?: number;
}
