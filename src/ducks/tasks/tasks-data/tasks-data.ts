import { createSlice } from '@reduxjs/toolkit';

interface InitialStateInterface {
  areTasksLoading: boolean;
  tasksError: string | undefined;
  completedTasks: number;
}

const initialState: InitialStateInterface = {
  areTasksLoading: false,
  tasksError: undefined,
  completedTasks: 0
};

const tasksDataSlice = createSlice({
  name: 'tasksData',
  initialState,
  reducers: {
    resetTasksData: () => initialState
  }
});

export const { resetTasksData } = tasksDataSlice.actions;

export default tasksDataSlice.reducer;
