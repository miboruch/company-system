import fetchMiddleware from 'api/api.middleware';

import { CURRENCY_API_URL } from 'utils/config';

export type currencies = 'PLN' | 'EUR' | 'USD';

export const fetchCurrencyValue = (currency: currencies) =>
  fetchMiddleware({ method: 'get', url: `/latest?base=PLN&symbols=${currency}`, baseUrl: CURRENCY_API_URL });
