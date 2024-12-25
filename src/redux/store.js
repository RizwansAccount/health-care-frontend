import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import SnackBarReducer from './snackBarReducer';
import { healthCareApi } from './storeApis';

export const store = configureStore({
    reducer: { 
        SnackBarReducer,
        [healthCareApi.reducerPath] : healthCareApi.reducer 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(healthCareApi.middleware),
})

setupListeners(store.dispatch);