import { combineReducers } from 'redux';
import clientData from './client-data/client-data';
import clientToggle from './client-toggle/client-toggle';

export const client = combineReducers({ clientData, clientToggle });
