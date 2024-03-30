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
        url: `/${updatedStore.storeId}`,
        method: 'PATCH',
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
    deleteStore: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
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
  useDeleteStoreMutation,
} = StoresApi;
