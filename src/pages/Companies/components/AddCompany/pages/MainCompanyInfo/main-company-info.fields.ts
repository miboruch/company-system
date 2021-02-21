import { Field } from 'types';

export const mainCompanyInfoFields: Field[] = [
  { name: 'name', type: 'text', label: 'Nazwa firmy', required: true, spacing: true },
  { name: 'nip', type: 'text', label: 'NIP', required: true, spacing: true },
  { name: 'email', type: 'email', label: 'Email', required: true, spacing: true },
  { name: 'phoneNumber', type: 'phone', label: 'Numer telefonu', required: true, spacing: true }
];
