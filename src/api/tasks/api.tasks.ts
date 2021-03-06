import fetchMiddleware from 'api/api.middleware';
import { TaskModel, ParamsId } from 'types';

export const fetchTasks = (companyId: ParamsId) => () =>
  fetchMiddleware<TaskModel[]>({
    method: 'get',
    url: `/task/get-company-tasks?company_id=${companyId}`
  });
