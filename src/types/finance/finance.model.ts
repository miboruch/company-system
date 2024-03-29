interface IncomeExpenseInterface {
  createdDate: Date;
  _id: string;
  companyId: string;
  description: string;
}

export interface IncomeModel extends IncomeExpenseInterface {
  incomeValue: number;
  expenseValue?: never;
}

export interface ExpenseModel extends IncomeExpenseInterface {
  expenseValue: number;
  incomeValue?: never;
}

export interface FinancesModel extends IncomeExpenseInterface {
  incomeValue: number;
  expenseValue: number;
}

export interface LastIncomeExpense {
  incomes: IncomeModel[];
  expenses: ExpenseModel[];
}

export interface CompanyBudget {
  budget: number;
  _id: string;
  companyId: string;
}
