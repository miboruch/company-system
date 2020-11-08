import { CompanyBudgetInterface, IncomeInterface, ExpenseInterface } from '../modelsTypes';

export interface IncomeExpenseInterface {
  incomes: IncomeInterface[];
  expenses: ExpenseInterface[];
}

export const SET_BUDGET_LOADING = 'SET_BUDGET_LOADING';
export const SET_BUDGET_INCOME = 'SET_BUDGET_INCOME';
export const SET_BUDGET_EXPENSE = 'SET_BUDGET_EXPENSE';
export const SET_LAST_INCOMES = 'SET_LAST_INCOMES';
export const SET_LAST_EXPENSES = 'SET_LAST_EXPENSES';
export const SET_COMPANY_BUDGET = 'SET_COMPANY_BUDGET';
export const SET_BUDGET_ERROR = 'SET_BUDGET_ERROR';
export const RESET_FINANCES = 'RESET_FINANCES';

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

export interface SetLastIncomes {
  type: typeof SET_LAST_INCOMES;
  payload: IncomeInterface[];
}

export interface SetLastExpenses {
  type: typeof SET_LAST_EXPENSES;
  payload: ExpenseInterface[];
}

export interface SetBudgetError {
  type: typeof SET_BUDGET_ERROR;
  payload: any;
}

export interface ResetFinances {
  type: typeof RESET_FINANCES;
}

export type FinanceActionTypes = SetBudgetLoading | SetBudgetIncome | SetBudgetExpense | SetCompanyBudget | SetLastIncomes | SetLastExpenses | SetBudgetError | ResetFinances;
