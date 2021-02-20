import { Field } from 'types';

export const accountSettingsFields: Field[] = [
  { name: 'email', type: 'email', label: 'Email', required: true },
  { name: 'name', type: 'text', label: 'Imię', required: true },
  { name: 'lastName', type: 'text', label: 'Nazwisko', required: true },
  { name: 'dateOfBirth', type: 'date', label: 'Data urodzenia', required: true },
  { name: 'phoneNumber', type: 'phone', label: 'Numer telefonu', required: true },
  { name: 'address', type: 'text', label: 'Adres', required: true },
  { name: 'city', type: 'text', label: 'Miasto', required: true },
  { name: 'country', type: 'text', label: 'Kraj', required: true }
];
