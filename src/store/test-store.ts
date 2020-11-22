import { configureStore } from '@reduxjs/toolkit';
import { testRootReducer } from '../reducers/test-rootReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: testRootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof testRootReducer>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
