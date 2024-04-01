import React from 'react';
import CategoriesClient from './components/client';
import prisma from '@/utils/connect';

const Categories = async ({ params }) => {
  const { storeId } = params;
  const categories = await prisma.categories.findMany({
    where: { storeId },
    include: {
      billboard: true,
    },
  });
  return (
    <div>
      <CategoriesClient data={categories?.length > 0 && categories} />
    </div>
  );
};

export default Categories;
