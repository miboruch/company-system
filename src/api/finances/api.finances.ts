import fetchMiddleware from 'api/api.middleware';
import queryString from 'query-string';

import { queryOptions } from 'utils/config';

interface FinancesModel {
  _id: string;
  companyId: string;
  description: string;
  incomeValue: number;
  expenseValue: number;
  createdDate: Date;
}

export const fetchFinances = ({ daysBack = 30 }: { daysBack: number }) => () => {
  const query = queryString.stringify({ daysBack }, queryOptions);
  return fetchMiddleware<FinancesModel[]>({ method: 'get', url: `/finances?${query}` });
};
