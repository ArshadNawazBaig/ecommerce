import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CategoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (build) => ({
    getCategories: build.query({
      query: (storeId) => `/${storeId}/categories`,
    }),
    getCategoryById: build.query({
      query: (obj) => `/${obj.storeId}/categories/${obj.categoryId}`,
    }),
    updateCategory: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/categories/${obj.categoryId}`,
        method: 'PATCH',
        body: obj.category,
      }),
    }),
    addCategory: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/categories`,
        method: 'POST',
        body: obj.category,
      }),
    }),
    deleteCategory: build.mutation({
      query: (obj) => ({
        url: `/${obj.storeId}/categories/${obj.categoryId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoryByIdQuery,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useLazyGetCategoriesQuery,
  useDeleteCategoryMutation,
} = CategoriesApi;
