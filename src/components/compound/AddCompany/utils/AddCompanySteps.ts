export interface StepObjectInterface {
  stepName: string;
  description: string;
  pageIndex: number;
}

export const addCompanySteps: StepObjectInterface[] = [
  {
    stepName: 'Główne informacje o twojej firmie',
    description: 'Nazwa, NIP, email, numer telefonu',
    pageIndex: 0
  },
  {
    stepName: 'Lokalizacja twojej firmy',
    description: 'Pozycja na mapie',
    pageIndex: 1
  },
  {
    stepName: 'Informacje o lokalizacji',
    description: 'Adres, miasto, kraj',
    pageIndex: 2
  }
];
