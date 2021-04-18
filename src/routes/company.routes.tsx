import React from 'react';

import Landing from 'pages/Landing/Landing';
import Companies from 'pages/Companies/Companies';
import Employee from 'pages/Employee/Employee';
import Task from 'pages/Task/Task';
import Clients from 'pages/Clients/Clients';
import Attendance from 'pages/Attendance/Attendance';
import Finances from 'pages/Finances/Finances';
import Settings from 'pages/Settings/Settings';
import { Route } from 'types';

export const adminRoutes: Route[] = [
  {
    path: '/home',
    main: '/admin/home',
    exact: false,
    component: Landing,
    isGuarded: true
  },
  {
    path: '/employees',
    main: '/admin/employees',
    exact: false,
    component: Employee,
    isGuarded: true
  },
  {
    path: '/tasks',
    main: '/admin/tasks',
    exact: false,
    component: Task,
    isGuarded: true
  },
  {
    path: '/finances',
    main: '/admin/finances',
    exact: false,
    component: Finances,
    isGuarded: true
  },
  {
    path: '/client',
    main: '/admin/client',
    exact: false,
    component: Clients,
    isGuarded: true
  },
  {
    path: '/attendance',
    main: '/admin/attendance',
    exact: false,
    component: Attendance,
    isGuarded: true
  },
  {
    path: '/admin/companies',
    main: '/admin/companies',
    exact: false,
    component: Companies,
    isGuarded: false
  },
  {
    path: '/settings',
    main: '/admin/settings',
    exact: false,
    component: Settings,
    isGuarded: true
  }
];

export const userRoutes: Route[] = [
  {
    path: '/home',
    main: '/user/home',
    exact: false,
    component: Landing,
    isGuarded: true
  },
  {
    path: '/tasks',
    main: '/user/tasks',
    exact: false,
    component: Task,
    isGuarded: true
  },
  {
    path: '/attendance',
    main: '/user/attendance',
    exact: false,
    component: Attendance,
    isGuarded: true
  },
  {
    path: '/user/companies',
    main: '/user/companies',
    exact: false,
    component: Companies,
    isGuarded: false
  },
  {
    path: '/settings',
    main: '/user/settings',
    exact: false,
    component: Settings,
    isGuarded: true
  }
];
