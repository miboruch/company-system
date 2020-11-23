import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  }
});

export const { resetBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
