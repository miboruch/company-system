import { History } from 'history';

import { setTaskInfoOpen, setSelectedTask } from './tasks-toggle';
import { AppDispatch } from 'store/store';
import { TaskModel } from 'types';
import { AppState } from 'store/store';
import { UserRole } from '../../auth/roles/roles';

export const selectTask = (task: TaskModel | null) => (dispatch: AppDispatch): void => {
  dispatch(setSelectedTask(task));
  dispatch(setTaskInfoOpen(!!task));
};

export const redirectToTask = (history: History, task: TaskModel, id: string) => (
  dispatch: AppDispatch,
  getState: () => AppState
): void => {
  const { role } = getState().auth.roles;

  role === UserRole.User ? history.push(`/user/tasks/${id}`) : history.push(`/admin/tasks/${id}`);
  dispatch(setTaskInfoOpen(true));
  dispatch(setSelectedTask(task));
};
