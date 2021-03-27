import { currencyTypes } from 'ducks/currency/currency-creators';

export const API_URL = 'http://localhost:8080';
export const CURRENCY_API_URL = 'https://api.exchangeratesapi.io';

export const LOGIN_IMAGE_BACKGROUND_OPACITY = 0.5;
export const NOTIFICATION_VISIBILITY_TIME = 5000;

export const FINANCES_DATA_DAYS_BACK = 30;

export const DEFAULT_COMPANY_ID = '5f79a8e665bf093c1f418ee9';

export const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
export const weekDays = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

export const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad asperiores, autem cum deleniti dolorem ea eligendi fuga incidunt inventore itaque labore molestias nihil nobis rerum tempore tenetur voluptatem voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut fugit illumitaque magnam, minima, natus nesciunt obcaecati praesentium quas quisquam ratione repellendus sint soluta temporibus totam vel velit vero!';

export const appCurrencies: currencyTypes[] = ['PLN', 'EUR', 'USD'];

export const queryOptions = {
  skipNull: true,
  skipEmptyString: true
}
