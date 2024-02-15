import { configureStore } from '@reduxjs/toolkit';
import { ProductsApi } from './features/Products';
import { setupListeners } from '@reduxjs/toolkit/query';
import modalSlice from './slices/ModalSlice';
export const store = configureStore({
  reducer: {
    modal: modalSlice,
    [ProductsApi.reducerPath]: ProductsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductsApi.middleware),
});
setupListeners(store.dispatch);
