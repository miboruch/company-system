import { combineReducers } from 'redux';
import taskToggle from './tasks-toggle/tasks-toggle';
import taskData from './tasks-data/tasks-data';

export const tasks = combineReducers({ taskToggle, taskData });
