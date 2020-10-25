import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AppState, rootReducer } from '../reducers/rootReducer';
import { AppTypes } from '../types/actionTypes/appActionTypes';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState, AppTypes>));
const store = createStore(rootReducer, enhancer);

export default store;
