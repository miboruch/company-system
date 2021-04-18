import fetchMiddleware from 'api/api.middleware';
import queryString from 'query-string';

import { ParamsId, NotificationModel } from 'types';
import { queryOptions } from 'utils/config';

export const fetchNotifications = ({ page = 1 }: { page?: number }) => () => {
  const query = queryString.stringify({ page }, queryOptions);
  return fetchMiddleware<NotificationModel[]>({ method: 'get', url: `/notification?${query}` });
};

export const openNotification = (notificationId: ParamsId) =>
  fetchMiddleware<NotificationModel[]>({ method: 'put', url: `notification/open/${notificationId}` });

export const deleteNotification = (notificationId: ParamsId) =>
  fetchMiddleware({ method: 'delete', url: `/notification/${notificationId}` });
