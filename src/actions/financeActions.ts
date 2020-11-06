import { ExpenseInterface, IncomeInterface } from '../types/modelsTypes';
import {
  SET_BUDGET_ERROR,
  SET_BUDGET_EXPENSE,
  SET_BUDGET_INCOME,
  SET_BUDGET_LOADING,
  SET_COMPANY_BUDGET,
  SET_LAST_EXPENSES,
  SET_LAST_INCOMES,
  SetBudgetError,
  SetBudgetExpense,
  SetBudgetIncome,
  SetBudgetLoading,
  SetCompanyBudget,
  SetLastExpenses,
  SetLastIncomes
} from '../types/actionTypes/financeActionTypes';

const setBudgetLoading = (isLoading: boolean): SetBudgetLoading => {
  return {
    type: SET_BUDGET_LOADING,
    payload: isLoading
  };
};

const setBudgetIncome = (income: number): SetBudgetIncome => {
  return {
    type: SET_BUDGET_INCOME,
    payload: income
  };
};

const setBudgetExpense = (expense: number): SetBudgetExpense => {
  return {
    type: SET_BUDGET_EXPENSE,
    payload: expense
  };
};

const setCompanyBudget = (budget: number): SetCompanyBudget => {
  return {
    type: SET_COMPANY_BUDGET,
    payload: budget
  };
};

const setLastIncomes = (lastIncomes: IncomeInterface[]): SetLastIncomes => {
  return {
    type: SET_LAST_INCOMES,
    payload: lastIncomes
  };
};

const setLastExpenses = (lastExpenses: ExpenseInterface[]): SetLastExpenses => {
  return {
    type: SET_LAST_EXPENSES,
    payload: lastExpenses
  };
};

const setBudgetError = (error: string | null): SetBudgetError => {
  return {
    type: SET_BUDGET_ERROR,
    payload: error
  };
};
