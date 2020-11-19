import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../reducers/rootReducer';
import { testRootReducer } from '../reducers/test-rootReducer';

const store = configureStore({
  reducer: testRootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppState = ReturnType<typeof rootReducer>;

export default store;
