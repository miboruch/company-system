import React from 'react';
import { AnyMongoAbility } from '@casl/ability';

import Landing from 'pages/Landing/Landing';
import Companies from 'pages/Companies/Companies';
import Employee from 'pages/Employee/Employee';
import Task from 'pages/Task/Task';
import Clients from 'pages/Clients/Clients';
import Attendance from 'pages/Attendance/Attendance';
import Finances from 'pages/Finances/Finances';
import Settings from 'pages/Settings/Settings';
import { MenuItem } from 'types';

import { HomeIcon, PaymentIcon, ListIcon, SupportIcon, UserIcon, SettingsIcon } from 'styles/shared';

export const menuItems = (ability: AnyMongoAbility): MenuItem[] => [
  {
    path: '/home',
    main: '/admin/home',
    component: Landing,
    name: 'Strona główna',
    icon: <HomeIcon />,
    isGuarded: true,
    isVisible: true
  },
  {
    path: '/employees',
    main: '/admin/employees',
    component: Employee,
    name: 'Pracownicy',
    icon: <UserIcon />,
    isGuarded: true,
    isVisible: ability.can('read', 'Employee')
  },
  {
    path: '/tasks',
    main: '/admin/tasks',
    component: Task,
    name: 'Zadania',
    icon: <ListIcon />,
    isGuarded: true,
    isVisible: ability.can('read', 'Task')
  },
  {
    path: '/finances',
    main: '/admin/finances',
    component: Finances,
    name: 'Finanse',
    icon: <PaymentIcon />,
    isGuarded: true,
    isVisible: ability.can('read', 'Budget')
  },
  {
    path: '/client',
    main: '/admin/client',
    component: Clients,
    name: 'Klienci',
    icon: <SupportIcon />,
    isGuarded: true,
    isVisible: ability.can('read', 'Client')
  },
  {
    path: '/attendance',
    main: '/admin/attendance',
    component: Attendance,
    name: 'Lista obecności',
    icon: <ListIcon />,
    isGuarded: true,
    isVisible: ability.can('read', 'Attendance')
  },
  {
    path: '/companies',
    main: '/admin/companies',
    component: Companies,
    name: 'Twoje firmy',
    icon: <HomeIcon />,
    isGuarded: false,
    isVisible: true
  },
  {
    path: '/settings',
    main: '/admin/settings',
    component: Settings,
    name: 'Ustawienia',
    icon: <SettingsIcon />,
    isGuarded: true,
    isVisible: true
  }
];
