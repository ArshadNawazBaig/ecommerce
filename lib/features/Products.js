import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ProductsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => '/products',
    }),
    getProductById: build.query({
      query: (productId) => `/products/${productId}`,
    }),
    updateProduct: build.mutation({
      query: (updatedProduct) => ({
        url: `/products/${updatedProduct.id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
    }),
    addProduct: build.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
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
} = ProductsApi;
