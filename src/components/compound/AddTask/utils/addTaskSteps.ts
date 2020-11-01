import { PageSettingEnum } from '../context/PageContext';

export interface StepObjectInterface {
  stepName: string;
  description: string;
  pageIndex: PageSettingEnum;
}

export const addTaskSteps: StepObjectInterface[] = [
  {
    stepName: 'Informacje o zadaniu',
    description: 'Wypełnij informacje',
    pageIndex: PageSettingEnum.First
  },
  {
    stepName: 'Informacje szczegółowe',
    description: 'Szacowany czas, wydatki i przychody',
    pageIndex: PageSettingEnum.Second
  }
];
