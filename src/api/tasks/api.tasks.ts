import fetchMiddleware from 'api/api.middleware';
import { TaskModel, ParamsId } from 'types';

export const fetchTasks = () =>
  fetchMiddleware<TaskModel[]>({
    method: 'get',
    url: `/task/company`
  });

export const fetchTask = (taskId: ParamsId) => () =>
  fetchMiddleware<TaskModel>({
    method: 'get',
    url: `/task/${taskId}`
  });
