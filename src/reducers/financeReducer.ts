import {
  FinanceActionTypes,
  RESET_FINANCES,
  SET_BUDGET_ERROR,
  SET_BUDGET_EXPENSE,
  SET_BUDGET_INCOME,
  SET_BUDGET_LOADING,
  SET_COMPANY_BUDGET,
  SET_LAST_EXPENSES,
  SET_LAST_INCOMES
} from '../types/actionTypes/financeActionTypes';
import { ExpenseInterface, IncomeInterface } from '../types/modelsTypes';

interface DefaultState {
  isBudgetLoading: boolean;
  income: number;
  expense: number;
  budget: number;
  lastIncomes: IncomeInterface[];
  lastExpenses: ExpenseInterface[];
  budgetError: string | null;
}

const initialState: DefaultState = {
  isBudgetLoading: false,
  income: 0,
  expense: 0,
  budget: 0,
  lastIncomes: [],
  lastExpenses: [],
  budgetError: null
};

export const financeReducer = (state = initialState, action: FinanceActionTypes): DefaultState => {
  switch (action.type) {
    case SET_BUDGET_LOADING:
      return {
        ...state,
        isBudgetLoading: action.payload
      };
    case SET_BUDGET_INCOME:
      return {
        ...state,
        income: action.payload
      };
    case SET_BUDGET_EXPENSE:
      return {
        ...state,
        expense: action.payload
      };
    case SET_COMPANY_BUDGET:
      return {
        ...state,
        budget: action.payload,
        isBudgetLoading: false
      };
    case SET_LAST_INCOMES:
      return {
        ...state,
        lastIncomes: action.payload
      };
    case SET_LAST_EXPENSES:
      return {
        ...state,
        lastExpenses: action.payload
      };
    case SET_BUDGET_ERROR:
      return {
        ...state,
        budgetError: action.payload,
        isBudgetLoading: false
      };
    case RESET_FINANCES:
      return initialState;
    default:
      return state;
  }
};
