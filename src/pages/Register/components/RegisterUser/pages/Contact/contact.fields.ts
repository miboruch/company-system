import { Field } from 'types';

export const contactFields: Field[] = [
  { name: 'address', label: 'Adres', type: 'text', required: true },
  { name: 'city', label: 'Miasto', type: 'text', required: true },
  { name: 'country', label: 'Państwo', type: 'text', required: true },
  { name: 'phoneNumber', label: 'Numer telefonu', type: 'phone', required: true }
];
