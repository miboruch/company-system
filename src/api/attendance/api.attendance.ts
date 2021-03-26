import fetchMiddleware from 'api/api.middleware';
import { AttendanceModel } from 'types';
import queryString from 'query-string';

export const fetchUserAttendance = (date: Date) => () => {
  const query = queryString.stringify({ date: new Date(date).toISOString() });
  return fetchMiddleware<AttendanceModel[]>({
    method: 'get',
    url: `/attendance/user?${query}`
  });
};

export const fetchSingleDayAttendance = (date: Date) => () => {
  const query = queryString.stringify({ date: new Date(date).toISOString() });
  return fetchMiddleware<AttendanceModel[]>({
    method: 'get',
    url: `/attendance/single-day?${query}`
  });
};
