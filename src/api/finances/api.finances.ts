import fetchMiddleware from 'api/api.middleware';
import queryString from 'query-string';

import { FinancesModel } from 'types';
import { queryOptions } from 'utils/config';

export const fetchFinances = ({ daysBack = 30 }: { daysBack: number }) => () => {
  const query = queryString.stringify({ daysBack }, queryOptions);
  return fetchMiddleware<FinancesModel[]>({ method: 'get', url: `/finances?${query}` });
};

export const fetchCompanyBudget = () => fetchMiddleware({ method: 'get', url: '/budget' });
