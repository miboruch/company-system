import axios from 'axios';
import {
  SetTaskLoading,
  SetCompanyTasks,
  SetSelectedTask,
  SetTaskError,
  SetTaskInfoOpen,
  SetAddNewTaskOpen,
  SetEditTask,
  SET_TASK_LOADING,
  SET_COMPANY_TASKS,
  SET_SELECTED_TASK,
  SET_TASK_ERROR,
  SET_TASK_INFO_OPEN,
  SET_ADD_NEW_TASK_OPEN,
  SET_EDIT_TASK
} from '../types/actionTypes/taskActionTypes';
import { TaskInterface } from '../types/modelsTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { API_URL } from '../utils/config';
import { AppState } from '../reducers/rootReducer';

const setTaskLoading = (isLoading: boolean): SetTaskLoading => {
  return {
    type: SET_TASK_LOADING,
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

export const setTaskInfoOpen = (isOpen: boolean): SetTaskInfoOpen => {
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

export const getCompanyTasks = () => async (dispatch: Dispatch<AppTypes>, getState: () => AppState) => {
  try {
    dispatch(setTaskLoading(true));
    const { token } = getState().authenticationReducer;
    const { currentCompany } = getState().companyReducer;

    if (currentCompany?._id && token) {
      const { data } = await axios.get(`${API_URL}/task/get-company-tasks?company_id=${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setCompanyTasks(data));
    } else {
      dispatch(setTaskError('Brak danych'));
    }
  } catch (error) {
    dispatch(setTaskError(error));
  }
};

export const selectTask = (task: TaskInterface | null) => (dispatch: Dispatch<AppTypes>) => {
  dispatch(setSelectedTask(task));
  dispatch(setTaskInfoOpen(true));
};
