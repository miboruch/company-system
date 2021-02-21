import fetchMiddleware from 'api/api.middleware';

export const validateRegistrationToken = (token: string) =>
  fetchMiddleware({ method: 'post', url: '/auth/verify-registration-token', data: { token } });
