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
    path: '/home',
    exact: false,
    component: LandingPage
  },
  // {
  //   path: '/companies',
  //   exact: false,
  //   component: CompaniesPage
  // },
  {
    path: '/employees',
    exact: false,
    component: EmployeePage
  },
  {
    path: '/tasks',
    exact: false,
    component: TaskPage
  },
  {
    path: '/clients',
    exact: false,
    component: ClientsPage
  },
  {
    path: '/attendance',
    exact: false,
    component: AttendancePage
  }
];
