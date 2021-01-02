import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskInterface } from 'types/modelsTypes';
import { getCompanyTasks, getCompletedTasks, getEmployeeTasks } from './task-data-creators';

interface InitialStateInterface {
  allCompanyTasks: TaskInterface[];
  areTasksLoading: boolean;
  tasksError: string | undefined;
  completedTasks: number;
}

const initialState: InitialStateInterface = {
  allCompanyTasks: [],
  areTasksLoading: false,
  tasksError: undefined,
  completedTasks: 0
};

const tasksDataSlice = createSlice({
  name: 'tasksData',
  initialState,
  reducers: {
    resetTasksData: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyTasks.pending.type, (state) => {
      state.areTasksLoading = true;
      state.tasksError = undefined;
    });
    builder.addCase(getCompanyTasks.fulfilled.type, (state, { payload }: PayloadAction<TaskInterface[]>) => {
      state.areTasksLoading = false;
      state.tasksError = undefined;
      state.allCompanyTasks = payload;
    });
    builder.addCase(getCompanyTasks.rejected.type, (state, { payload }: PayloadAction<string | undefined>) => {
      state.areTasksLoading = false;
      state.tasksError = payload;
    });
    builder.addCase(getEmployeeTasks.fulfilled.type, (state, { payload }: PayloadAction<TaskInterface[]>) => {
      state.allCompanyTasks = payload;
    });
    builder.addCase(getCompletedTasks.fulfilled.type, (state, { payload }: PayloadAction<number>) => {
      state.completedTasks = payload;
    });
  }
});

export const { resetTasksData } = tasksDataSlice.actions;

export default tasksDataSlice.reducer;
