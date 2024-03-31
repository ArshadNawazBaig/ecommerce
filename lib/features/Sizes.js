import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SizesApi = createApi({
  reducerPath: 'sizesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (build) => ({
    getSizes: build.query({
      query: (storeId) => `/${storeId}/sizes`,
    }),
    getSizeById: build.query({
      query: (obj) => `/${obj.storeId}/sizes/${obj.sizeId}`,
    }),
    updateSize: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/sizes/${obj.sizeId}`,
        method: 'PATCH',
        body: obj.size,
      }),
    }),
    addSize: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/sizes`,
        method: 'POST',
        body: obj.size,
      }),
    }),
    deleteSize: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/sizes/${obj.sizeId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddSizeMutation,
  useGetSizeByIdQuery,
  useGetSizesQuery,
  useUpdateSizeMutation,
  useLazyGetSizesQuery,
  useDeleteSizeMutation,
} = SizesApi;
