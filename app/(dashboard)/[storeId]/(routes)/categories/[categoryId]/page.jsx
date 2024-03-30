import React from 'react';
import CategoryForm from './components/category-form';
import prisma from '@/utils/connect';

const Category = async ({ params }) => {
  const categories = await prisma?.categories?.findUnique({
    where: { id: params.categoryId },
  });

  return (
    <div>
      <CategoryForm categories={categories} />
    </div>
  );
};

export default Category;
