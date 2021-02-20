import { Field } from 'types';

export const mainRegisterFields: Field[] = [
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'name', label: 'Imię', type: 'text', required: true },
  { name: 'lastName', label: 'Nazwisko', type: 'text', required: true },
  { name: 'dateOfBirth', label: 'Data urodzenia', type: 'date', required: true }
];
