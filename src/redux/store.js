import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import SnackbarReducer from './snackBarReducer';

export const store = configureStore({
    reducer: { SnackbarReducer },
})

setupListeners(store.dispatch);