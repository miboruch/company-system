import { PageSettingEnum } from '../context/PageContext';

export interface StepObjectInterface {
  stepName: string;
  description: string;
  pageIndex: PageSettingEnum;
}

export const addClientSteps: StepObjectInterface[] = [
  {
    stepName: 'Główne informacje o kliencie',
    description: 'Nazwa, adres, email, numer telefonu',
    pageIndex: PageSettingEnum.First
  },
  {
    stepName: 'Lokalizacja klienta',
    description: 'Pozycja na mapie',
    pageIndex: PageSettingEnum.Second
  }
];
