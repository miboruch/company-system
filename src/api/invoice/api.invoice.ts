import fetchMiddleware from 'api/api.middleware';
import { InvoiceItem } from 'types';

export interface CreateInvoiceData {
  name: string;
  address: string;
  city: string;
  country: string;
  items: InvoiceItem[];
}

export const fetchEmployees = (data: CreateInvoiceData) => fetchMiddleware({ method: 'post', url: '/invoice', data });
