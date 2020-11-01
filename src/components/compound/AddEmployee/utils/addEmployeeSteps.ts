import { PageSettingEnum } from '../context/PageContext';

export interface StepObjectInterface {
  stepName: string;
  description: string;
  pageIndex: PageSettingEnum;
}

export const addEmployeeSteps: StepObjectInterface[] = [
  {
    stepName: 'Wybierz użytkownika',
    description: 'Wybór użytkownika',
    pageIndex: PageSettingEnum.First
  },
  {
    stepName: 'Informacje szczegółowe',
    description: 'Stawka godzinowa/miesięczna',
    pageIndex: PageSettingEnum.Second
  }
];
