import React from 'react';
import LandingPage from '../pages/LandingPage/LandingPage';
import CompaniesPage from '../pages/CompaniesPage/CompaniesPage';
import EmployeePage from '../pages/EmployeePage/EmployeePage';
import TaskPage from '../pages/TaskPage/TaskPage';
import ClientsPage from '../pages/ClientsPage/ClientsPage';
import AttendancePage from '../pages/AttendancePage/AttendancePage';

interface Routes {
  path: string;
  exact: boolean;
  component: React.FC;
}

export const adminRoutes: Routes[] = [
  {
    path: '/',
    exact: true,
    component: LandingPage
  },
  {
    path: '/admin/home',
    exact: false,
    component: LandingPage
  },
  {
    path: '/admin/companies',
    exact: false,
    component: CompaniesPage
  },
  {
    path: '/admin/employees',
    exact: false,
    component: EmployeePage
  },
  {
    path: '/admin/tasks',
    exact: false,
    component: TaskPage
  },
  {
    path: '/admin/clients',
    exact: false,
    component: ClientsPage
  },
  {
    path: '/admin/attendance',
    exact: false,
    component: AttendancePage
  }
];

export const userRoutes: Routes[] = [
  {
    path: '/',
    exact: true,
    component: LandingPage
  },
  {
    path: '/user/companies',
    exact: false,
    component: CompaniesPage
  },
  {
    path: '/user/home',
    exact: false,
    component: LandingPage
  },
  {
    path: '/user/tasks',
    exact: false,
    component: TaskPage
  },
  {
    path: '/user/attendance',
    exact: false,
    component: AttendancePage
  }
];
