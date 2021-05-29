import fetchMiddleware from 'api/api.middleware';
import { ParamsId, PermissionId, PermissionModel } from 'types';

export const fetchPermission = () => fetchMiddleware<PermissionModel>({ method: 'get', url: '/permission' });

export const putPermission = (userId: ParamsId, data: { roleId: PermissionId }) =>
  fetchMiddleware({ method: 'put', url: `/permission/${userId}`, data });
