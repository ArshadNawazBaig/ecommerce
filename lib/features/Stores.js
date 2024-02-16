import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const StoresApi = createApi({
  reducerPath: 'storesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (build) => ({
    getStores: build.query({
      query: () => '/stores',
    }),
    getStoreById: build.query({
      query: (storeId) => `/stores/${storeId}`,
    }),
    updateStore: build.mutation({
      query: (updatedStore) => ({
        url: `/stores/${updatedStore.id}`,
        method: 'PUT',
        body: updatedStore,
      }),
    }),
    addStore: build.mutation({
      query: (store) => ({
        url: '/stores',
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
