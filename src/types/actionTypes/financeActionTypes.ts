import { CompanyBudgetInterface, IncomeInterface, ExpenseInterface } from '../modelsTypes';

interface IncomeExpense {
  income: number;
  expense: number;
}
//get-income-expense

interface IncomeExpenseInterface {
  incomes: IncomeInterface[];
  expenses: ExpenseInterface[];
}

export const SET_BUDGET_LOADING = 'SET_BUDGET_LOADING';
export const SET_BUDGET_INCOME = 'SET_BUDGET_INCOME';
export const SET_BUDGET_EXPENSE = 'SET_BUDGET_EXPENSE';
export const SET_LAST_INCOME_EXPENSE = 'SET_LAST_INCOME_EXPENSE';
export const SET_COMPANY_BUDGET = 'SET_COMPANY_BUDGET';
export const SET_BUDGET_ERROR = 'SET_BUDGET_ERROR';

export interface SetBudgetLoading {
  type: typeof SET_BUDGET_LOADING;
  payload: boolean;
}

export interface SetBudgetIncome {
  type: typeof SET_BUDGET_INCOME;
  payload: number;
}

export interface SetBudgetExpense {
  type: typeof SET_BUDGET_EXPENSE;
  payload: number;
}

export interface SetCompanyBudget {
  type: typeof SET_COMPANY_BUDGET;
  payload: number;
}

export interface SetLastIncomeExpense {
  type: typeof SET_LAST_INCOME_EXPENSE;
  payload: IncomeExpenseInterface;
}

export interface SetBudgetError {
  type: typeof SET_BUDGET_ERROR;
  payload: any;
}
