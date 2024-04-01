import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ProductsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: (storeId) => `/${storeId}/products`,
    }),
    getProductById: build.query({
      query: (obj) => `/${obj.storeId}/products/${obj.productId}`,
    }),
    updateProduct: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/products/${obj.productId}`,
        method: 'PATCH',
        body: obj.product,
      }),
    }),
    addProduct: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/products`,
        method: 'POST',
        body: obj.product,
      }),
    }),
    deleteProduct: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/products/${obj.productId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useLazyGetProductsQuery,
  useDeleteProductMutation,
} = ProductsApi;
