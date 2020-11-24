import { History } from 'history';
import { AppDispatch } from '../../../store/test-store';
import { TaskInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../store/test-store';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';
import { setTaskInfoOpen, setSelectedTask } from './tasks-toggle';

export const selectTask = (task: TaskInterface | null) => (dispatch: AppDispatch): void => {
  dispatch(setSelectedTask(task));
  dispatch(setTaskInfoOpen(!!task));
};

export const redirectToTask = (history: History, task: TaskInterface) => (dispatch: AppDispatch, getState: () => AppState): void => {
  const { role } = getState().auth.roles;

  role === UserRole.User ? history.push('/user/tasks') : history.push('/admin/tasks');
  dispatch(setTaskInfoOpen(true));
  dispatch(setSelectedTask(task));
};