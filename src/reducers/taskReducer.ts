import {
  SET_ADD_NEW_TASK_OPEN,
  SET_COMPANY_TASKS,
  SET_EDIT_TASK,
  SET_TASK_LOADING,
  SET_SELECTED_TASK,
  SET_TASK_ERROR,
  SET_TASK_INFO_OPEN,
  TaskActionTypes
} from '../types/actionTypes/taskActionTypes';
import { TaskInterface } from '../types/modelsTypes';

interface DefaultState {
  allCompanyTasks: TaskInterface[];
  selectedTask: TaskInterface | null;
  isLoading: boolean;
  error: string | null;
  isTaskInfoOpen: boolean;
  isAddNewTaskOpen: boolean;
  isEditTaskOpen: boolean;
}

const initialState: DefaultState = {
  allCompanyTasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
  isTaskInfoOpen: false,
  isAddNewTaskOpen: false,
  isEditTaskOpen: false
};

export const taskReducer = (state = initialState, action: TaskActionTypes): DefaultState => {
  switch (action.type) {
    case SET_TASK_LOADING:
      return {
        ...state,
        isLoading: true
        // selectedTask: null
      };
    case SET_COMPANY_TASKS:
      return {
        ...state,
        isLoading: false,
        allCompanyTasks: action.payload
      };
    case SET_SELECTED_TASK:
      return {
        ...state,
        selectedTask: action.payload
      };
    case SET_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case SET_TASK_INFO_OPEN:
      return {
        ...state,
        isTaskInfoOpen: action.payload
      };
    case SET_ADD_NEW_TASK_OPEN:
      return {
        ...state,
        isAddNewTaskOpen: action.payload
      };
    case SET_EDIT_TASK:
      return {
        ...state,
        isEditTaskOpen: action.payload
      };
    default:
      return state;
  }
};
