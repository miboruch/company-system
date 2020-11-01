import axios from 'axios';
import {
  SET_ADD_NEW_TASK_OPEN,
  SET_COMPANY_TASKS,
  SET_EDIT_TASK,
  SET_SELECTED_TASK,
  SET_TASK_ERROR,
  SET_TASK_INFO_OPEN,
  SET_TASK_LOADING,
  SetAddNewTaskOpen,
  SetCompanyTasks,
  SetEditTask,
  SetSelectedTask,
  SetTaskError,
  SetTaskInfoOpen,
  SetTaskLoading
} from '../types/actionTypes/taskActionTypes';
import { TaskInterface } from '../types/modelsTypes';
import { Dispatch } from 'redux';
import { AppTypes } from '../types/actionTypes/appActionTypes';
import { API_URL } from '../utils/config';
import { AppState } from '../reducers/rootReducer';
import { setNotificationMessage } from './toggleActions';
import { NotificationTypes } from '../types/actionTypes/toggleAcitonTypes';

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

export const setAddNewTaskOpen = (isOpen: boolean): SetAddNewTaskOpen => {
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
  dispatch(setTaskLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
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

export const addNewTask = (date: Date, timeEstimate: number, name: string, description: string, isCompleted: boolean, taskIncome?: number, taskExpense?: number) => async (
  dispatch: Dispatch<any>,
  getState: () => AppState
) => {
  dispatch(setTaskLoading(true));

  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany?._id && token) {
      await axios.post(
        `${API_URL}/task/add-new-task?company_id=${currentCompany._id}`,
        {
          date,
          timeEstimate,
          name,
          description,
          isCompleted,
          taskIncome: taskIncome ? taskIncome : 0,
          taskExpense: taskExpense ? taskExpense : 0
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(getCompanyTasks());
      dispatch(setAddNewTaskOpen(false));
      dispatch(setNotificationMessage('Dodano nowe zadanie'));
    } else {
      dispatch(setTaskError('Problem z uwierzytelnieniem'));
      dispatch(setNotificationMessage('Problem z dodaniem zadania', NotificationTypes.Error));
    }
  } catch (error) {
    console.log(error);
    dispatch(setTaskError(error));
    dispatch(setNotificationMessage('Problem z dodaniem zadania', NotificationTypes.Error));
  }
};
