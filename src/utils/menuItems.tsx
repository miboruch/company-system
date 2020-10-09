import React from 'react';
import { HomeIcon, PaymentIcon, ListIcon, SupportIcon, UserIcon } from '../styles/sharedStyles';

interface MenuItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

export const menuItems: MenuItem[] = [
  {
    name: 'Twoje firmy',
    link: '/companies',
    icon: <HomeIcon />
  },
  {
    name: 'Strona główna',
    link: '/home',
    icon: <HomeIcon />
  },
  {
    name: 'Pracownicy',
    link: '/employees',
    icon: <UserIcon />
  },
  {
    name: 'Zadania',
    link: '/tasks',
    icon: <ListIcon />
  },
  {
    name: 'Finanse',
    link: '/finances',
    icon: <PaymentIcon />
  },
  {
    name: 'Klienci',
    link: '/clients',
    icon: <SupportIcon />
  },
  {
    name: 'Lista obecności',
    link: '/attendance',
    icon: <ListIcon />
  }
];
