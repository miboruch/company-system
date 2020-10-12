import axios from 'axios';
import { API_URL } from './config';

export const getAdminCompanies = async (setLoading: (isLoading: boolean) => void, setData: (data: []) => void, token: string): Promise<any> => {
  try {
    setLoading(true);
    const { data } = await axios.get(`${API_URL}/user/get-user-companies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setData(data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};

export const getEmployeeCompanies = async (setLoading: (isLoading: boolean) => void, setData: (data: []) => void, token: string): Promise<any> => {
  try {
    setLoading(true);
    const { data } = await axios.get(`${API_URL}/employee/get-employee-companies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setData(data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
  }
};
