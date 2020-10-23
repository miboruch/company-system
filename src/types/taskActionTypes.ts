import { TaskInterface } from './modelsTypes';

export const SET_LOADING = 'SET_LOADING';
export const SET_COMPANY_TASKS = 'SET_COMPANY_TASKS';
export const SET_SELECTED_TASK = 'SET_SELECTED_TASK';
export const SET_TASK_ERROR = 'SET_TASK_ERROR';
export const SET_TASK_INFO_OPEN = 'SET_TASK_INFO_OPEN';
export const SET_ADD_NEW_TASK_OPEN = 'SET_ADD_NEW_TASK_OPEN';
export const SET_EDIT_TASK = 'SET_EDIT_TASK';

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SetCompanyTasks {
  type: typeof SET_COMPANY_TASKS;
  payload: TaskInterface[];
}

export interface SetSelectedTask {
  type: typeof SET_SELECTED_TASK;
  payload: TaskInterface | null;
}

export interface SetTaskError {
  type: typeof SET_TASK_ERROR;
  payload: string | null;
}

export interface SetTaskInfoOpen {
  type: typeof SET_TASK_INFO_OPEN;
  payload: boolean;
}

export interface SetAddNewTaskOpen {
  type: typeof SET_ADD_NEW_TASK_OPEN;
  payload: boolean;
}

export interface SetEditTask {
  type: typeof SET_EDIT_TASK;
  payload: boolean;
}

export type EmployeesActionTypes = SetLoading | SetCompanyTasks | SetSelectedTask | SetTaskError | SetTaskInfoOpen | SetAddNewTaskOpen | SetEditTask;
