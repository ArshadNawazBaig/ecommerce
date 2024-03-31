import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import modalSlice from './slices/ModalSlice';
import { ProductsApi } from './features/Products';
import { StoresApi } from './features/Stores';
import { BillboardsApi } from './features/Billboards';
import { CategoriesApi } from './features/Categories';
import { SizesApi } from './features/Sizes';
import { ColorsApi } from './features/Colors';
export const store = configureStore({
  reducer: {
    modal: modalSlice,
    [ProductsApi.reducerPath]: ProductsApi.reducer,
    [StoresApi.reducerPath]: StoresApi.reducer,
    [BillboardsApi.reducerPath]: BillboardsApi.reducer,
    [CategoriesApi.reducerPath]: CategoriesApi.reducer,
    [SizesApi.reducerPath]: SizesApi.reducer,
    [ColorsApi.reducerPath]: ColorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ProductsApi.middleware,
      StoresApi.middleware,
      BillboardsApi.middleware,
      CategoriesApi.middleware,
      SizesApi.middleware,
      ColorsApi.middleware
    ),
});
setupListeners(store.dispatch);
