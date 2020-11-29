import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskInterface } from '../../../types/modelsTypes';

interface InitialStateInterface {
  selectedTask: TaskInterface | null;
  isTaskInfoOpen: boolean;
  isAddNewTaskOpen: boolean;
  isTaskMapPreviewOpen: boolean;
}

const initialState: InitialStateInterface = {
  selectedTask: null,
  isTaskInfoOpen: false,
  isAddNewTaskOpen: false,
  isTaskMapPreviewOpen: false
};

const tasksToggleSlice = createSlice({
  name: 'tasksToggle',
  initialState,
  reducers: {
    setSelectedTask: (state, { payload }: PayloadAction<TaskInterface | null>) => {
      state.selectedTask = payload;
    },
    setTaskInfoOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isTaskInfoOpen = payload;
    },
    setAddNewTaskOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isAddNewTaskOpen = payload;
    },
    setTaskMapPreviewOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isTaskMapPreviewOpen = payload;
    },
    resetTaskToggle: () => initialState
  }
});

export const { setSelectedTask, setTaskInfoOpen, setAddNewTaskOpen, setTaskMapPreviewOpen, resetTaskToggle } = tasksToggleSlice.actions;

export default tasksToggleSlice.reducer;
