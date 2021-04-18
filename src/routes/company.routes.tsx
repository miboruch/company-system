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
import { Route } from 'types';

export const routes = (ability: AnyMongoAbility): Route[] => [
  {
    path: '/home',
    main: '/admin/home',
    exact: false,
    component: Landing,
    isGuarded: true,
    isVisible: true
  },
  {
    path: '/employees',
    main: '/admin/employees',
    exact: false,
    component: Employee,
    isGuarded: true,
    isVisible: ability.can('read', 'Employee')
  },
  {
    path: '/tasks',
    main: '/admin/tasks',
    exact: false,
    component: Task,
    isGuarded: true,
    isVisible: ability.can('read', 'Task')
  },
  {
    path: '/finances',
    main: '/admin/finances',
    exact: false,
    component: Finances,
    isGuarded: true,
    isVisible: ability.can('read', 'Budget')
  },
  {
    path: '/client',
    main: '/admin/client',
    exact: false,
    component: Clients,
    isGuarded: true,
    isVisible: ability.can('read', 'Client')
  },
  {
    path: '/attendance',
    main: '/admin/attendance',
    exact: false,
    component: Attendance,
    isGuarded: true,
    isVisible: ability.can('read', 'Attendance')
  },
  {
    path: '/admin/companies',
    main: '/admin/companies',
    exact: false,
    component: Companies,
    isGuarded: false,
    isVisible: true
  },
  {
    path: '/settings',
    main: '/admin/settings',
    exact: false,
    component: Settings,
    isGuarded: true,
    isVisible: true
  }
];
