import { Field } from 'types';

export const taskInfoFields: Field[] = [
  { name: 'name', type: 'text', label: 'Nazwa', required: true, spacing: true },
  { name: 'description', type: 'text', label: 'Opis', required: true, spacing: true },
  { name: 'timeEstimate', type: 'number', label: 'Szacowany czas', required: true, spacing: true },
  { name: 'taskIncome', type: 'number', label: 'Przychód z zadania', required: false, spacing: true },
  { name: 'taskExpense', type: 'number', label: 'Wydatek z zadania', required: false, spacing: true }
];
