export enum AdminSettingsSubcategories {
  AccountSettings = 'accountSettings',
  CompanySettings = 'companySettings',
  ChangePassword = 'changePassword',
  AddAdmin = 'addAdmin'
}

export enum UserSettingsSubcategories {
  AccountSettings = 'accountSettings',
  ChangePassword = 'changePassword'
}

interface SettingsInterface {
  name: string;
  roleEnum: AdminSettingsSubcategories | UserSettingsSubcategories;
}

export const adminSettings: SettingsInterface[] = [
  {
    name: 'Ustawienia konta',
    roleEnum: AdminSettingsSubcategories.AccountSettings
  },
  {
    name: 'Edycja firmy',
    roleEnum: AdminSettingsSubcategories.CompanySettings
  },
  {
    name: 'Dodaj administratorów',
    roleEnum: AdminSettingsSubcategories.AddAdmin
  },
  {
    name: 'Zmiana hasła',
    roleEnum: AdminSettingsSubcategories.ChangePassword
  }
];

export const userSettings: SettingsInterface[] = [
  {
    name: 'Ustawienia konta',
    roleEnum: UserSettingsSubcategories.AccountSettings
  },
  {
    name: 'Zmiana hasła',
    roleEnum: UserSettingsSubcategories.ChangePassword
  }
];
