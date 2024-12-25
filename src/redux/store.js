import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import SnackBarReducer from './snackBarReducer';

export const store = configureStore({
    reducer: { SnackBarReducer },
})

setupListeners(store.dispatch);