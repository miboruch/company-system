import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCompanyBudget } from './budget-creators';

interface InitialStateInterface {
  budget: number;
  isBudgetLoading: boolean;
  budgetError: string | undefined;
}

const initialState: InitialStateInterface = {
  budget: 0,
  isBudgetLoading: false,
  budgetError: undefined
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    resetBudget: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyBudget.pending.type, (state) => {
        state.isBudgetLoading = true;
        state.budgetError = undefined;
      })
      .addCase(getCompanyBudget.fulfilled.type, (state, { payload }: PayloadAction<number>) => {
        state.isBudgetLoading = false;
        state.budget = payload;
      })
      .addCase(getCompanyBudget.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
        state.isBudgetLoading = false;
        state.budgetError = payload;
      });
  }
});

export const { resetBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
