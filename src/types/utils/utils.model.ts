import React from 'react';
import { RouteComponentProps } from 'react-router';

export interface CurrencyModel {
  name: string;
  value: number;
}

export interface Coords {
  lat: number;
  long: number;
}

export interface RouteConfig {
  name?: string;
  path: string;
  exact: boolean;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export interface Route {
  path: string;
  main: string;
  exact: boolean;
  component: React.FC;
  isGuarded: boolean;
}

export interface MenuItem {
  path: string;
  main: string;
  component: React.FC;
  name?: string;
  icon?: React.ReactNode;
  isGuarded: boolean;
}
