import { Field } from 'types';

export const companySettingsFields: Field[] = [
  { name: 'name', type: 'text', label: 'Nazwa', required: true },
  { name: 'email', type: 'email', label: 'Email', required: true },
  { name: 'nip', type: 'text', label: 'NIP', required: true },
  { name: 'phoneNumber', type: 'phone', label: 'Numer telefonu', required: true },
  { name: 'address', type: 'text', label: 'Adres', required: true },
  { name: 'city', type: 'text', label: 'Miasto', required: true },
  { name: 'country', type: 'text', label: 'Kraj', required: true }
];
