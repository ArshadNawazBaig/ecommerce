import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import modalSlice from './slices/ModalSlice';
import { ProductsApi } from './features/Products';
import { StoresApi } from './features/Stores';
export const store = configureStore({
  reducer: {
    modal: modalSlice,
    [ProductsApi.reducerPath]: ProductsApi.reducer,
    [StoresApi.reducerPath]: StoresApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductsApi.middleware, StoresApi.middleware),
});
setupListeners(store.dispatch);
