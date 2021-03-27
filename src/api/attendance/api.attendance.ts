import fetchMiddleware from 'api/api.middleware';
import { AttendanceModel, ParamsId, WeekAttendanceModel } from 'types';
import queryString from 'query-string';

export const fetchUserAttendance = (date: Date) => () => {
  const query = queryString.stringify({ date: new Date(date).toISOString() });
  return fetchMiddleware<AttendanceModel[]>({
    method: 'get',
    url: `/attendance/user?${query}`
  });
};

export const fetchDayAttendance = (date: Date) => () => {
  const query = queryString.stringify({ date: new Date(date).toISOString() });
  return fetchMiddleware<AttendanceModel[]>({
    method: 'get',
    url: `/attendance/single-day?${query}`
  });
};

export const fetchSingleAttendance = (id: ParamsId) => () =>
  fetchMiddleware<AttendanceModel>({
    method: 'get',
    url: `/attendance/${id}`
  });

export const fetchUserWeekAttendance = (userId: ParamsId, week: number) => () => {
  const query = queryString.stringify({ user_id: userId, week });
  return fetchMiddleware<WeekAttendanceModel[]>({
    method: 'get',
    url: `/attendance/user-week?${query}`
  });
};
