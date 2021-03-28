import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IncomeModel, ExpenseModel } from 'types';
import {
  getLastIncomesAndExpenses,
  getCompanyIncomeAndExpense,
  IncomeExpenseReturnInterface,
  LastIncomesExpensesReturnInterface
} from './income-expense-creators';

interface InitialStateInterface {
  isLoading: boolean;
  income: number;
  expense: number;
  lastIncomes: IncomeModel[];
  lastExpenses: ExpenseModel[];
  incomeError: string | undefined;
}

const initialState: InitialStateInterface = {
  isLoading: false,
  income: 0,
  expense: 0,
  lastIncomes: [],
  lastExpenses: [],
  incomeError: undefined
};

const incomeExpenseSlice = createSlice({
  name: 'incomeExpense',
  initialState,
  reducers: {
    resetIncomeExpense: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyIncomeAndExpense.pending.type, (state) => {
      state.isLoading = true;
      state.incomeError = undefined;
    });
    builder.addCase(
      getCompanyIncomeAndExpense.fulfilled.type,
      (state, { payload }: PayloadAction<IncomeExpenseReturnInterface>) => {
        state.isLoading = false;
        state.income = payload.income;
        state.expense = payload.expense;
      }
    );
    builder.addCase(getCompanyIncomeAndExpense.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.income = 0;
      state.expense = 0;
      state.incomeError = payload;
    });
    builder.addCase(getLastIncomesAndExpenses.pending.type, (state) => {
      state.isLoading = true;
      state.incomeError = undefined;
    });
    builder.addCase(
      getLastIncomesAndExpenses.fulfilled.type,
      (state, { payload }: PayloadAction<LastIncomesExpensesReturnInterface>) => {
        state.isLoading = false;
        state.lastIncomes = payload.lastIncomes;
        state.lastExpenses = payload.lastExpenses;
      }
    );
    builder.addCase(getLastIncomesAndExpenses.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.isLoading = false;
      state.lastIncomes = [];
      state.lastExpenses = [];
      state.incomeError = payload;
    });
  }
});

export const { resetIncomeExpense } = incomeExpenseSlice.actions;

export default incomeExpenseSlice.reducer;
