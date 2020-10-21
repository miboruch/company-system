import axios from 'axios';
import { API_URL, DEFAULT_COMPANY_ID } from './config';
import { IncomeDataInterface } from '../types/modelsTypes';

export const getIncomeExpenseInTimePeriod = async (token: string | null, daysBack: number, setData: (data: Array<any>) => void): Promise<any> => {
  try {
    const { data } = await axios.get(`${API_URL}/income/get-last-incomes?company_id=${DEFAULT_COMPANY_ID}&daysBack=${daysBack}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { data: expenseData } = await axios.get(`${API_URL}/expense/get-last-expenses?company_id=${DEFAULT_COMPANY_ID}&daysBack=${daysBack}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setData(
      data.map((income: IncomeDataInterface, index: number) => ({
        ...income,
        expenseValue: expenseData[index].expenseValue,
        createdDate: new Date(income.createdDate).toLocaleDateString()
      }))
    );
  } catch (error) {
    console.log(error);
  }
};
