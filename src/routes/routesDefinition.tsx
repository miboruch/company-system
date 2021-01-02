import React from 'react';

import LandingPage from '../pages/LandingPage/LandingPage';
import CompaniesPage from '../pages/CompaniesPage/CompaniesPage';
import EmployeePage from '../pages/EmployeePage/EmployeePage';
import TaskPage from '../pages/TaskPage/TaskPage';
import ClientsPage from '../pages/ClientsPage/ClientsPage';
import AttendancePage from '../pages/AttendancePage/AttendancePage';
import FinancesPage from '../pages/FinancesPage/FinancesPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';

import { HomeIcon, PaymentIcon, ListIcon, SupportIcon, UserIcon, SettingsIcon } from 'styles/shared';

interface Routes {
  path: string;
  exact: boolean;
  component: React.FC;
  name: string;
  icon: React.ReactNode;
  isGuarded: boolean;
}

export const adminRoutes: Routes[] = [
  {
    path: '/admin/home',
    exact: false,
    component: LandingPage,
    name: 'Strona główna',
    icon: <HomeIcon />,
    isGuarded: true
  },
  {
    path: '/admin/employees',
    exact: false,
    component: EmployeePage,
    name: 'Pracownicy',
    icon: <UserIcon />,
    isGuarded: true
  },
  {
    path: '/admin/tasks',
    exact: false,
    component: TaskPage,
    name: 'Zadania',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/admin/finances',
    exact: false,
    component: FinancesPage,
    name: 'Finanse',
    icon: <PaymentIcon />,
    isGuarded: true
  },
  {
    path: '/admin/clients',
    exact: false,
    component: ClientsPage,
    name: 'Klienci',
    icon: <SupportIcon />,
    isGuarded: true
  },
  {
    path: '/admin/attendance',
    exact: false,
    component: AttendancePage,
    name: 'Lista obecności',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/admin/companies',
    exact: false,
    component: CompaniesPage,
    name: 'Twoje firmy',
    icon: <HomeIcon />,
    isGuarded: false
  },
  {
    path: '/admin/settings',
    exact: false,
    component: SettingsPage,
    name: 'Ustawienia',
    icon: <SettingsIcon />,
    isGuarded: true
  }
];

export const userRoutes: Routes[] = [
  {
    path: '/user/home',
    exact: false,
    component: LandingPage,
    name: 'Strona główna',
    icon: <HomeIcon />,
    isGuarded: true
  },
  {
    path: '/user/tasks',
    exact: false,
    component: TaskPage,
    name: 'Zadania',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/user/attendance',
    exact: false,
    component: AttendancePage,
    name: 'Lista obecności',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/user/companies',
    exact: false,
    component: CompaniesPage,
    name: 'Twoje firmy',
    icon: <HomeIcon />,
    isGuarded: false
  },
  {
    path: '/user/settings',
    exact: false,
    component: SettingsPage,
    name: 'Ustawienia',
    icon: <SettingsIcon />,
    isGuarded: true
  }
];
