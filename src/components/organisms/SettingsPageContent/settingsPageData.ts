export enum AdminSettingsSubcategories {
  AccountSettings = 'accountSettings',
  CompanySettings = 'companySettings',
  AddAdmin = 'addAdmin'
}

export enum UserSettingsSubcategories {
  AccountSettings = 'accountSettings'
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
  }
];

export const userSettings: SettingsInterface[] = [
  {
    name: 'Ustawienia konta',
    roleEnum: UserSettingsSubcategories.AccountSettings
  }
];
