import React from 'react';
import CategoryForm from './components/category-form';
import prisma from '@/utils/connect';

const Category = async ({ params }) => {
  const category = await prisma?.categories?.findUnique({
    where: { id: params.categoryId },
  });

  return (
    <div>
      <CategoryForm category={category} />
    </div>
  );
};

export default Category;
