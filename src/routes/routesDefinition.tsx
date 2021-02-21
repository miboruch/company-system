import React from 'react';

import Landing from 'pages/Landing/Landing';
import Companies from 'pages/Companies/Companies';
import EmployeePage from '../pages/EmployeePage/EmployeePage';
import Task from 'pages/Task/Task';
import ClientsPage from '../pages/ClientsPage/ClientsPage';
import AttendancePage from '../pages/AttendancePage/AttendancePage';
import Finances from 'pages/Finances/Finances';
import Settings from 'pages/Settings/Settings';

import { HomeIcon, PaymentIcon, ListIcon, SupportIcon, UserIcon, SettingsIcon } from 'styles/shared';

interface Routes {
  path: string;
  main: string;
  exact: boolean;
  component: React.FC;
  name: string;
  icon: React.ReactNode;
  isGuarded: boolean;
}

export const adminRoutes: Routes[] = [
  {
    path: '/admin/home/:id',
    main: '/admin/home',
    exact: false,
    component: Landing,
    name: 'Strona główna',
    icon: <HomeIcon />,
    isGuarded: true
  },
  {
    path: '/admin/employees/:id',
    main: '/admin/employees',
    exact: false,
    component: EmployeePage,
    name: 'Pracownicy',
    icon: <UserIcon />,
    isGuarded: true
  },
  {
    path: '/admin/tasks/:id',
    main: '/admin/tasks',
    exact: false,
    component: Task,
    name: 'Zadania',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/admin/finances/:id',
    main: '/admin/finances',
    exact: false,
    component: Finances,
    name: 'Finanse',
    icon: <PaymentIcon />,
    isGuarded: true
  },
  {
    path: '/admin/clients/:id',
    main: '/admin/clients',
    exact: false,
    component: ClientsPage,
    name: 'Klienci',
    icon: <SupportIcon />,
    isGuarded: true
  },
  {
    path: '/admin/attendance/:id',
    main: '/admin/attendance',
    exact: false,
    component: AttendancePage,
    name: 'Lista obecności',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/admin/companies',
    main: '/admin/companies',
    exact: false,
    component: Companies,
    name: 'Twoje firmy',
    icon: <HomeIcon />,
    isGuarded: false
  },
  {
    path: '/admin/settings/:id',
    main: '/admin/settings',
    exact: false,
    component: Settings,
    name: 'Ustawienia',
    icon: <SettingsIcon />,
    isGuarded: true
  }
];

export const userRoutes: Routes[] = [
  {
    path: '/user/home/:id',
    main: '/user/home',
    exact: false,
    component: Landing,
    name: 'Strona główna',
    icon: <HomeIcon />,
    isGuarded: true
  },
  {
    path: '/user/tasks/:id',
    main: '/user/tasks',
    exact: false,
    component: Task,
    name: 'Zadania',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/user/attendance/:id',
    main: '/user/attendance',
    exact: false,
    component: AttendancePage,
    name: 'Lista obecności',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/user/companies',
    main: '/user/companies',
    exact: false,
    component: Companies,
    name: 'Twoje firmy',
    icon: <HomeIcon />,
    isGuarded: false
  },
  {
    path: '/user/settings/:id',
    main: '/user/settings',
    exact: false,
    component: Settings,
    name: 'Ustawienia',
    icon: <SettingsIcon />,
    isGuarded: true
  }
];
