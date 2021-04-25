import { Route } from 'types';

import MainFinances from '../components/MainFinances/MainFinances';
import History from '../components/History/History';
import Invoice from '../components/Invoice/Invoice';

export const financesRoutes: Route[] = [
  {
    path: '/',
    exact: true,
    component: MainFinances
  },
  {
    path: '/history',
    exact: false,
    component: History
  },
  {
    path: '/invoice',
    exact: false,
    component: Invoice
  }
];
