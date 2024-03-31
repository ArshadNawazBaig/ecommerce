import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ColorsApi = createApi({
  reducerPath: 'colorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (build) => ({
    getColors: build.query({
      query: (storeId) => `/${storeId}/colors`,
    }),
    getColorById: build.query({
      query: (obj) => `/${obj.storeId}/colors/${obj.colorId}`,
    }),
    updateColor: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/colors/${obj.colorId}`,
        method: 'PATCH',
        body: obj.color,
      }),
    }),
    addColor: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/colors`,
        method: 'POST',
        body: obj.color,
      }),
    }),
    deleteColor: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/colors/${obj.colorId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddColorMutation,
  useGetColorByIdQuery,
  useGetColorsQuery,
  useUpdateColorMutation,
  useLazyGetColorsQuery,
  useDeleteColorMutation,
} = ColorsApi;
