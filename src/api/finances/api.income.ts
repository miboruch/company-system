import fetchMiddleware from 'api/api.middleware';
import { ParamsId } from 'types';

interface AddIncomeData {
  incomeValue: number;
  description: string;
}

export const postIncome = (data: AddIncomeData) => fetchMiddleware({ method: 'post', url: '/income', data });

export const deleteIncome = (incomeId: ParamsId) => fetchMiddleware({ method: 'delete', url: `/income/${incomeId}` });
