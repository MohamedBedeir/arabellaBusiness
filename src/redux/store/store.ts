import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import authSlice from './auth/authenticationSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
