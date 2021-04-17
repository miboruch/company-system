import fetchMiddleware from 'api/api.middleware';

export const generateAccessToken = (data: { refreshToken: string }) =>
  fetchMiddleware({ method: 'post', url: '/auth/token', data });

interface CompanyAccessTokenData {
  refreshToken: string;
  companyId: string;
}

export const generateCompanyAccessToken = (data: CompanyAccessTokenData) =>
  fetchMiddleware({ method: 'post', url: '/auth/company-token', data });
