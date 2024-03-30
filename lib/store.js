import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import modalSlice from './slices/ModalSlice';
import { ProductsApi } from './features/Products';
import { StoresApi } from './features/Stores';
import { BillboardsApi } from './features/Billboards';
export const store = configureStore({
  reducer: {
    modal: modalSlice,
    [ProductsApi.reducerPath]: ProductsApi.reducer,
    [StoresApi.reducerPath]: StoresApi.reducer,
    [BillboardsApi.reducerPath]: BillboardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ProductsApi.middleware,
      StoresApi.middleware,
      BillboardsApi.middleware
    ),
});
setupListeners(store.dispatch);
