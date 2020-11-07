import React from 'react';
import { HomeIcon, PaymentIcon, ListIcon, SupportIcon, UserIcon } from '../styles/shared';

interface MenuItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

export const adminMenuItems: MenuItem[] = [
  {
    name: 'Strona główna',
    link: '/admin/home',
    icon: <HomeIcon />
  },
  {
    name: 'Pracownicy',
    link: '/admin/employees',
    icon: <UserIcon />
  },
  {
    name: 'Zadania',
    link: '/admin/tasks',
    icon: <ListIcon />
  },
  {
    name: 'Finanse',
    link: '/admin/finances',
    icon: <PaymentIcon />
  },
  {
    name: 'Klienci',
    link: '/admin/clients',
    icon: <SupportIcon />
  },
  {
    name: 'Lista obecności',
    link: '/admin/attendance',
    icon: <ListIcon />
  },
  {
    name: 'Twoje firmy',
    link: '/admin/companies',
    icon: <HomeIcon />
  },
  {
    name: 'Ustawienia',
    link: '/admin/settings',
    icon: <HomeIcon />
  }
];

export const userMenuItems: MenuItem[] = [
  {
    name: 'Strona główna',
    link: '/user/home',
    icon: <HomeIcon />
  },
  {
    name: 'Zadania',
    link: '/user/tasks',
    icon: <ListIcon />
  },
  {
    name: 'Lista obecności',
    link: '/user/attendance',
    icon: <ListIcon />
  },
  {
    name: 'Twoje firmy',
    link: '/user/companies',
    icon: <HomeIcon />
  }
];
