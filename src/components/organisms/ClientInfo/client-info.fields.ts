import { Field } from 'types';

export const clientInfoFields = (isEditToggled: boolean): Field[] => {
  const disabled = !isEditToggled;

  return [
    { name: 'name', type: 'text', label: 'Nazwa', required: true, spacing: true, disabled },
    { name: 'email', type: 'email', label: 'Email', required: true, spacing: true, disabled },
    { name: 'phoneNumber', type: 'phone', label: 'Numer telefonu', required: true, spacing: true, disabled },
    { name: 'address', type: 'text', label: 'Adres', required: true, spacing: true, disabled },
    { name: 'city', type: 'text', label: 'Miasto', required: true, spacing: true, disabled },
    { name: 'country', type: 'text', label: 'Państwo', required: true, spacing: true, disabled }
  ];
};
