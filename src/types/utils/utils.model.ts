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
  exact: boolean;
  component: React.FC;
  isGuarded?: boolean;
  isVisible?: boolean;
}

export interface MenuItem {
  path: string;
  component: React.FC;
  name?: string;
  icon?: React.ReactNode;
  isGuarded: boolean;
  isVisible?: boolean;
}
