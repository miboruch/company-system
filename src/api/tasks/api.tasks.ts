import fetchMiddleware from 'api/api.middleware';
import { TaskModel, ParamsId, ClientModel } from 'types';

/**
 * @get
 */

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

/**
 * @put
 */

export interface TaskValues {
  date: Date;
  name: string;
  description: string;
  timeEstimate: number;
  taskIncome?: number;
  taskExpense?: number;
  isCompleted?: boolean;
  clientId?: ClientModel | null;
}

export const putTask = (taskId: ParamsId) => (data: TaskValues) =>
  fetchMiddleware<TaskModel>({
    method: 'put',
    url: `/task/${taskId}`,
    data
  });

interface PostTaskValues extends TaskValues {
  employees: string[];
}

// `/task/edit-task`,
