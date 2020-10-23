import axios from 'axios';
import {
  SetLoading,
  SetCompanyTasks,
  SetSelectedTask,
  SetTaskError,
  SetTaskInfoOpen,
  SetAddNewTaskOpen,
  SetEditTask,
  SET_LOADING,
  SET_COMPANY_TASKS,
  SET_SELECTED_TASK,
  SET_TASK_ERROR,
  SET_TASK_INFO_OPEN,
  SET_ADD_NEW_TASK_OPEN,
  SET_EDIT_TASK
} from '../types/taskActionTypes';
import { TaskInterface } from '../types/modelsTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/appActionTypes';
import { API_URL } from '../utils/config';

const setLoading = (isLoading: boolean): SetLoading => {
  return {
    type: SET_LOADING,
    payload: isLoading
  };
};
const setCompanyTasks = (companyTasks: TaskInterface[]): SetCompanyTasks => {
  return {
    type: SET_COMPANY_TASKS,
    payload: companyTasks
  };
};

const setSelectedTask = (selectedTask: TaskInterface | null): SetSelectedTask => {
  return {
    type: SET_SELECTED_TASK,
    payload: selectedTask
  };
};

const setTaskError = (error: string | null): SetTaskError => {
  return {
    type: SET_TASK_ERROR,
    payload: error
  };
};

const setTaskInfoOpen = (isOpen: boolean): SetTaskInfoOpen => {
  return {
    type: SET_TASK_INFO_OPEN,
    payload: isOpen
  };
};

const setAddNewTaskOpen = (isOpen: boolean): SetAddNewTaskOpen => {
  return {
    type: SET_ADD_NEW_TASK_OPEN,
    payload: isOpen
  };
};

const setEditTaskOpen = (isOpen: boolean): SetEditTask => {
  return {
    type: SET_EDIT_TASK,
    payload: isOpen
  };
};

export const getCompanyTasks = (token: string, companyId: string) => async (dispatch: Dispatch<AppTypes>) => {
  try {
    dispatch(setLoading(true));

    const { data } = await axios.get(`${API_URL}/task/get-company-tasks?company_id=${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch(setCompanyTasks(data));
  } catch (error) {
    dispatch(setTaskError(error));
  }
};

export const selectTask = (task: TaskInterface | null) => (dispatch: Dispatch<AppTypes>) => {
  dispatch(setSelectedTask(task));
  dispatch(setTaskInfoOpen(true));
};
