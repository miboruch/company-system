import { configureStore } from '@reduxjs/toolkit';
import { testRootReducer } from '../reducers/test-rootReducer';
import { rootReducer } from '../reducers/rootReducer';
import { useDispatch } from 'react-redux';
import { adminInterceptors } from '../api';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
// export type AppState = ReturnType<typeof testRootReducer>;

export type baseStoreType = { dispatch: AppDispatch; state: AppState };

export const useAppDispatch = () => useDispatch<AppDispatch>();

// const { currentCompany } = store.getState().company.currentCompany;
// const { refreshToken } = store.getState().auth.tokens;
// const { role } = store.getState().auth.roles;
//
// if (currentCompany && refreshToken) {
//   adminInterceptors(refreshToken, currentCompany._id);
// }

export default store;
