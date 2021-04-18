import React from 'react';

import Landing from 'pages/Landing/Landing';
import Companies from 'pages/Companies/Companies';
import Employee from 'pages/Employee/Employee';
import Task from 'pages/Task/Task';
import Clients from 'pages/Clients/Clients';
import Attendance from 'pages/Attendance/Attendance';
import Finances from 'pages/Finances/Finances';
import Settings from 'pages/Settings/Settings';
import { MenuItem, Route } from 'types';

import { HomeIcon, PaymentIcon, ListIcon, SupportIcon, UserIcon, SettingsIcon } from 'styles/shared';

export const adminRoutes: MenuItem[] = [
  {
    path: '/home',
    main: '/admin/home',
    component: Landing,
    name: 'Strona główna',
    icon: <HomeIcon />,
    isGuarded: true
  },
  {
    path: '/employees',
    main: '/admin/employees',
    component: Employee,
    name: 'Pracownicy',
    icon: <UserIcon />,
    isGuarded: true
  },
  {
    path: '/tasks',
    main: '/admin/tasks',
    component: Task,
    name: 'Zadania',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/finances',
    main: '/admin/finances',
    component: Finances,
    name: 'Finanse',
    icon: <PaymentIcon />,
    isGuarded: true
  },
  {
    path: '/client',
    main: '/admin/client',
    component: Clients,
    name: 'Klienci',
    icon: <SupportIcon />,
    isGuarded: true
  },
  {
    path: '/attendance',
    main: '/admin/attendance',
    component: Attendance,
    name: 'Lista obecności',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/companies',
    main: '/admin/companies',
    component: Companies,
    name: 'Twoje firmy',
    icon: <HomeIcon />,
    isGuarded: false
  },
  {
    path: '/settings',
    main: '/admin/settings',
    component: Settings,
    name: 'Ustawienia',
    icon: <SettingsIcon />,
    isGuarded: true
  }
];

export const userRoutes: MenuItem[] = [
  {
    path: '/user/home/:id',
    main: '/user/home',
    component: Landing,
    name: 'Strona główna',
    icon: <HomeIcon />,
    isGuarded: true
  },
  {
    path: '/user/tasks/:id',
    main: '/user/tasks',
    component: Task,
    name: 'Zadania',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/user/attendance/:id',
    main: '/user/attendance',
    component: Attendance,
    name: 'Lista obecności',
    icon: <ListIcon />,
    isGuarded: true
  },
  {
    path: '/user/companies',
    main: '/user/companies',
    component: Companies,
    name: 'Twoje firmy',
    icon: <HomeIcon />,
    isGuarded: false
  },
  {
    path: '/user/settings/:id',
    main: '/user/settings',
    component: Settings,
    name: 'Ustawienia',
    icon: <SettingsIcon />,
    isGuarded: true
  }
];
