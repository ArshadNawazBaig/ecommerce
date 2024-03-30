import React from 'react';
import CategoriesClient from './components/client';

const Categories = async ({ params }) => {
  const { storeId } = params;
  const categories = await prisma.categories.findMany({
    where: { storeId },
  });
  return (
    <div>
      <CategoriesClient data={categories?.length > 0 && categories} />
    </div>
  );
};

export default Categories;
