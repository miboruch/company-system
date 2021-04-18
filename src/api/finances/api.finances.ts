import queryString from 'query-string';

import fetchMiddleware from 'api/api.middleware';
import { FinancesModel, LastIncomeExpense, CompanyBudget } from 'types';
import { queryOptions } from 'utils/config';

export const fetchFinances = ({ daysBack = 30 }: { daysBack: number }) => () => {
  const query = queryString.stringify({ daysBack }, queryOptions);
  return fetchMiddleware<FinancesModel[]>({ method: 'get', url: `/finances?${query}` });
};

export const fetchCompanyBudget = () => fetchMiddleware<CompanyBudget>({ method: 'get', url: '/budget' });

export const fetchIncomeExpense = () => fetchMiddleware<LastIncomeExpense>({ method: 'get', url: '/budget/last-income-expense' });
