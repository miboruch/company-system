import fetchMiddleware from 'api/api.middleware';
import { TaskModel, TaskDataModel, ParamsId, ClientModel } from 'types';
import queryString from 'query-string';
import { queryOptions } from 'utils/config';

/**
 * @get
 */

export const fetchTasks = () => fetchMiddleware<TaskModel[]>({ method: 'get', url: `/task/company` });

export const fetchTask = (taskId: ParamsId) => () => fetchMiddleware<TaskModel>({ method: 'get', url: `/task/${taskId}` });

export const fetchCompletedTasks = ({ daysBack = 30 }: { daysBack?: number }) => () => {
  const query = queryString.stringify({ daysBack }, queryOptions);
  return fetchMiddleware<{ completedTasks: number }>({ method: 'get', url: `/task/completed?${query}` });
};

export const fetchCompletedPeriodTasks = ({ daysBack = 7 }: { daysBack: number }) => () => {
  const query = queryString.stringify({ daysBack }, queryOptions);
  return fetchMiddleware<{ date: Date; totalTasks: number }[]>({
    method: 'get',
    url: `/task/completed-tasks-period?${query}`
  });
};

export const fetchEmployeeTasks = (employeeId: ParamsId) => () =>
  fetchMiddleware<TaskModel[]>({ method: 'get', url: `/task/employee/${employeeId}` });

export interface PostTaskData extends TaskDataModel {
  clientId?: string | null;
  employees: string[];
}

export const postTask = (data: PostTaskData) =>
  fetchMiddleware<{ completedTasks: number }>({
    method: 'post',
    url: '/task',
    data
  });

export interface TaskValues extends TaskDataModel {
  clientId?: ClientModel | null;
}

export const putTask = (taskId: ParamsId) => (data: TaskValues) =>
  fetchMiddleware<TaskModel>({
    method: 'put',
    url: `/task/${taskId}`,
    data
  });

type TaskCompletedData = {
  isCompleted: boolean;
};

export const putTaskCompleted = (taskId: ParamsId, data: TaskCompletedData) =>
  fetchMiddleware({
    method: 'put',
    url: `/task/completed/${taskId}`,
    data
  });

export const deleteTask = (taskId: ParamsId) =>
  fetchMiddleware({
    method: 'delete',
    url: `/task/${taskId}`
  });
