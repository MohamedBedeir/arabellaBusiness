import {api} from '../networkInstance.config';
import {clearUserCache} from '../../middleware/authentication/login';
import {AsyncThunkAction} from '@reduxjs/toolkit';
import {Dispatch, AnyAction} from 'redux';

let store: {
  dispatch: (
    arg0: AsyncThunkAction<
      void,
      void,
      {
        state?: unknown;
        dispatch?: Dispatch<AnyAction> | undefined;
        extra?: unknown;
        rejectValue?: unknown;
        serializedErrorType?: unknown;
        pendingMeta?: unknown;
        fulfilledMeta?: unknown;
        rejectedMeta?: unknown;
      }
    >,
  ) => void;
};

export const injectStore = (_store: {
  dispatch: (
    arg0: AsyncThunkAction<
      void,
      void,
      {
        state?: unknown;
        dispatch?: Dispatch<AnyAction> | undefined;
        extra?: unknown;
        rejectValue?: unknown;
        serializedErrorType?: unknown;
        pendingMeta?: unknown;
        fulfilledMeta?: unknown;
        rejectedMeta?: unknown;
      }
    >,
  ) => void;
}) => {
  store = _store;
};

api.interceptors.response.use(
  async (response: any) => {
    return response;
  },
  (err: any) => {
    if (err?.response?.status === 401) {
      store.dispatch(clearUserCache());
    }
    return Promise.reject(err?.response);
  },
);
