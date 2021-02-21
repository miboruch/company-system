export interface IncomeDataInterface {
  createdDate: string | Date;
  _id: string;
  companyId: string;
  incomeValue: number;
  description: string;
}

export interface ExpenseDataInterface {
  createdDate: string | Date;
  _id: string;
  companyId: string;
  incomeValue: number;
  description: string;
}

interface IncomeExpenseInterface {
  createdDate: Date;
  _id: string;
  companyId: string;
  description: string;
}

export interface IncomeInterface extends IncomeExpenseInterface {
  incomeValue: number;
  expenseValue?: never;
}

export interface ExpenseInterface extends IncomeExpenseInterface {
  expenseValue: number;
  incomeValue?: never;
}
