import { configureStore } from '@reduxjs/toolkit';
import { testRootReducer } from '../reducers/test-rootReducer';
import { rootReducer } from '../reducers/rootReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
// export type AppState = ReturnType<typeof testRootReducer>;

export type baseStoreType = { dispatch: AppDispatch; state: AppState };

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
