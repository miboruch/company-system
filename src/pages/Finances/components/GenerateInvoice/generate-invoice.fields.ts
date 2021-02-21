import { Field } from 'types';

export const generateInvoiceFields: Field[] = [
  { name: 'name', type: 'text', label: 'Nazwa odbiorcy', required: true, spacing: true },
  { name: 'address', type: 'text', label: 'Adres odbiorcy', required: true, spacing: true },
  { name: 'city', type: 'text', label: 'Miasto', required: true, spacing: true },
  { name: 'country', type: 'text', label: 'Kraj', required: true, spacing: true }
];
