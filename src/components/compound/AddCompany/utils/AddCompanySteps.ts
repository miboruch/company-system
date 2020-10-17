import { PageSettingEnum } from '../context/PageContext';

export interface StepObjectInterface {
  stepName: string;
  description: string;
  pageIndex: PageSettingEnum;
}

export const addCompanySteps: StepObjectInterface[] = [
  {
    stepName: 'Główne informacje o twojej firmie',
    description: 'Nazwa, NIP, email, numer telefonu',
    pageIndex: PageSettingEnum.First
  },
  {
    stepName: 'Lokalizacja twojej firmy',
    description: 'Pozycja na mapie',
    pageIndex: PageSettingEnum.Second
  },
  {
    stepName: 'Informacje o lokalizacji',
    description: 'Adres, miasto, kraj',
    pageIndex: PageSettingEnum.Third
  }
];
