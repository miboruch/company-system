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

import { HomeIcon, PaymentIcon, ListIcon, SupportIcon, UserIcon, SettingsIcon } from 'styles';

export const menuItems = (ability: AnyMongoAbility, companyId?: string): MenuItem[] => {
  const id = companyId || localStorage.getItem('companyId');
  return [
    {
      path: `/company/${id}/home`,
      component: Landing,
      name: 'Strona główna',
      icon: <HomeIcon />,
      isGuarded: true,
      isVisible: true
    },
    {
      path: `/company/${id}/employees`,
      component: Employee,
      name: 'Pracownicy',
      icon: <UserIcon />,
      isGuarded: true,
      isVisible: ability.can('read', 'Employee')
    },
    {
      path: `/company/${id}/tasks`,
      component: Task,
      name: 'Zadania',
      icon: <ListIcon />,
      isGuarded: true,
      isVisible: ability.can('read', 'Task')
    },
    {
      path: `/company/${id}/finances`,
      component: Finances,
      name: 'Finanse',
      icon: <PaymentIcon />,
      isGuarded: true,
      isVisible: ability.can('read', 'Budget')
    },
    {
      path: `/company/${id}/client`,
      component: Clients,
      name: 'Klienci',
      icon: <SupportIcon />,
      isGuarded: true,
      isVisible: ability.can('read', 'Client')
    },
    {
      path: `/company/${id}/attendance`,
      component: Attendance,
      name: 'Lista obecności',
      icon: <ListIcon />,
      isGuarded: true,
      isVisible: ability.can('read', 'Attendance')
    },
    {
      path: '/companies',
      component: Companies,
      name: 'Twoje firmy',
      icon: <HomeIcon />,
      isGuarded: false,
      isVisible: true
    },
    {
      path: '/settings',
      component: Settings,
      name: 'Ustawienia',
      icon: <SettingsIcon />,
      isGuarded: true,
      isVisible: true
    }
  ];
};
