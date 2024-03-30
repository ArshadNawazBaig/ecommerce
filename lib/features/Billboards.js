import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BillboardsApi = createApi({
  reducerPath: 'billboardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (build) => ({
    getBillboards: build.query({
      query: (storeId) => `/${storeId}/billboards`,
    }),
    getBillboardById: build.query({
      query: (obj) => `/${obj.storeId}/billboards/${obj.billboardId}`,
    }),
    updateBillboard: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/billboards/${obj.billboardId}`,
        method: 'PATCH',
        body: obj.billboard,
      }),
    }),
    addBillboard: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/billboards`,
        method: 'POST',
        body: obj.billboard,
      }),
    }),
    deleteBillboard: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/billboards/${obj.billboardId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddBillboardMutation,
  useGetBillboardByIdQuery,
  useGetBillboardsQuery,
  useUpdateBillboardMutation,
  useLazyGetBillboardsQuery,
  useDeleteBillboardMutation,
} = BillboardsApi;
