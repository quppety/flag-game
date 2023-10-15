import { Action, Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';

const localStorageMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch<Action>) => (action: Action) => {
    const result = next(action);
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
    return result;
  };

export default localStorageMiddleware;
