import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const StoresApi = createApi({
  reducerPath: 'storesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/stores',
  }),
  endpoints: (build) => ({
    getStores: build.query({
      query: () => '/',
    }),
    getStoreById: build.query({
      query: (storeId) => `/${storeId}`,
    }),
    updateStore: build.mutation({
      query: (updatedStore) => ({
        url: `/${updatedStore.id}`,
        method: 'PUT',
        body: updatedStore,
      }),
    }),
    addStore: build.mutation({
      query: (store) => ({
        url: '/',
        method: 'POST',
        body: store,
      }),
    }),
  }),
});

export const {
  useAddStoreMutation,
  useGetStoreByIdQuery,
  useGetStoresQuery,
  useUpdateStoreMutation,
  useLazyGetStoresQuery,
} = StoresApi;
