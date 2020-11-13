import axios from 'axios';
import { History } from 'history';
import {
  RESET_TASKS,
  ResetTasks,
  SET_ADD_NEW_TASK_OPEN,
  SET_COMPANY_TASKS,
  SET_COMPLETED_TASKS,
  SET_EDIT_TASK,
  SET_SELECTED_TASK,
  SET_TASK_ERROR,
  SET_TASK_INFO_OPEN,
  SET_TASK_LOADING,
  SetAddNewTaskOpen,
  SetCompanyTasks,
  SetCompletedTasks,
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
import { UserRole } from '../types/actionTypes/authenticationActionTypes';

const setTaskLoading = (isLoading: boolean): SetTaskLoading => {
  return {
    type: SET_TASK_LOADING,
    payload: isLoading
  };
};

export const setCompanyTasks = (companyTasks: TaskInterface[]): SetCompanyTasks => {
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

const setCompletedTasks = (completedTasks: number): SetCompletedTasks => {
  return {
    type: SET_COMPLETED_TASKS,
    payload: completedTasks
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
  dispatch(setTaskInfoOpen(!!task));
};

export const addNewTask = (date: Date, timeEstimate: number, name: string, description: string, isCompleted: boolean, taskIncome?: number, taskExpense?: number, clientId?: string | null) => async (
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
          clientId,
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

export const getSingleTask = (taskId: string) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany?._id && token) {
      const { data } = await axios.get(`${API_URL}/task/get-single-company-task/${taskId}?company_id=${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(setSelectedTask(data));
      dispatch(setNotificationMessage('Usunięto zadanie'));
    } else {
      dispatch(setTaskError('Problem z uwierzytelnieniem'));
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = (taskId: string) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany?._id && token) {
      await axios.delete(`${API_URL}/task/delete-task/${taskId}?company_id=${currentCompany._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch(getCompanyTasks());
      dispatch(setSelectedTask(null));
      dispatch(setTaskInfoOpen(false));
      dispatch(setNotificationMessage('Usunięto zadanie'));
    } else {
      dispatch(setTaskError('Problem z uwierzytelnieniem'));
      dispatch(setNotificationMessage('Problem z usunięciem zadania', NotificationTypes.Error));
    }
  } catch (error) {
    console.log(error);
    dispatch(setTaskError(error));
    dispatch(setNotificationMessage('Problem z usunięciem zadania', NotificationTypes.Error));
  }
};

export const redirectToTask = (history: History, task: TaskInterface) => (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { role } = getState().authenticationReducer;

  role === UserRole.User ? history.push('/user/tasks') : history.push('/admin/tasks');
  dispatch(setTaskInfoOpen(true));
  dispatch(setSelectedTask(task));
};

export const getCompletedTasks = () => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const DAYS_BACK = 30;
  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany && token) {
      const { data } = await axios.get(`${API_URL}/task/count-last-completed-tasks?company_id=${currentCompany._id}&daysBack=${DAYS_BACK}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(data);
      // setCompletedTasks(data.completedTasks);
    }
  } catch (error) {
    console.log(error);
  }
};

export const editTask = (taskId: string, date: Date, name: string, description: string, timeEstimate: number, taskIncome: number, taskExpense: number) => async (
  dispatch: Dispatch<any>,
  getState: () => AppState
) => {
  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany && token) {
      await axios.put(
        `${API_URL}/task/edit-task?company_id=${currentCompany._id}`,
        {
          taskId,
          date,
          name,
          description,
          timeEstimate,
          taskIncome,
          taskExpense
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(selectTask(null));
      dispatch(getCompanyTasks());
      dispatch(setNotificationMessage('Edytowano zadanie'));
    }
  } catch (error) {
    dispatch(setNotificationMessage('Problem z edycją zadania', NotificationTypes.Error));
  }
};

export const changeTaskState = (taskId: string, isCompleted: boolean) => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { token } = getState().authenticationReducer;
  const { currentCompany } = getState().companyReducer;

  try {
    if (currentCompany && token) {
      await axios.put(
        `${API_URL}/task/set-task-completed?company_id=${currentCompany._id}`,
        {
          taskId,
          isCompleted
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      dispatch(getSingleTask(taskId));
      dispatch(getCompanyTasks());
      dispatch(setNotificationMessage('Zaktualizowano zadanie'));
    }
  } catch (error) {
    dispatch(setNotificationMessage('Problem z aktualizacją zadania', NotificationTypes.Error));
  }
};

export const resetTasks = (): ResetTasks => {
  return {
    type: RESET_TASKS
  };
};
