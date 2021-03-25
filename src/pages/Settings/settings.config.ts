import React from 'react';

import AccountSettings from './components/AccountSettings/AccountSettings';
import AdminSettings from './components/AdminSettings/AdminSettings';
import CompanySettings from './components/CompanySettings/CompanySettings';
import PasswordChangeSettings from './components/PasswordChangeSettings/PasswordChangeSettings';

export type AdminSettingsType = 'account' | 'company' | 'admins' | 'password';
export type UserSettingsType = 'account' | 'password';

interface SettingsInterface {
  name: string;
  roleEnum: AdminSettingsType | UserSettingsType;
}

export const adminSettings: SettingsInterface[] = [
  { name: 'Ustawienia konta', roleEnum: 'account' },
  { name: 'Edycja firmy', roleEnum: 'company' },
  { name: 'Dodaj administratorów', roleEnum: 'admins' },
  { name: 'Zmiana hasła', roleEnum: 'password' }
];

export const userSettings: SettingsInterface[] = [
  { name: 'Ustawienia konta', roleEnum: 'account' },
  { name: 'Zmiana hasła', roleEnum: 'password' }
];

export const renderSettings = (subcategory: AdminSettingsType | UserSettingsType): React.ReactNode => {
  switch (subcategory) {
    case 'account':
      return AccountSettings;
    case 'password':
      return PasswordChangeSettings;
    case 'admins':
      return AdminSettings;
    case 'company':
      return CompanySettings;
  }
};
