import fetchMiddleware from 'api/api.middleware';
import { ParamsId } from 'types';

interface AddExpenseData {
  expenseValue: number;
  description: string;
}

export const postExpense = (data: AddExpenseData) => fetchMiddleware({ method: 'post', url: '/expense', data });

export const deleteExpense = (expenseId: ParamsId) => fetchMiddleware({ method: 'delete', url: `/expense/${expenseId}` });
