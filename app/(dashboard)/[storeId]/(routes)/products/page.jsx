import Heading from '@/components/typography/heading';
import React from 'react';
import ProductClient from './components/client';
import prisma from '@/utils/connect';

const Products = async ({ params }) => {
  const { storeId } = params;
  const products = await prisma.product.findMany({
    where: { storeId },
    include: {
      category: true,
      size: true,
      color: true,
    },
  });
  return (
    <div>
      <ProductClient data={products} />
    </div>
  );
};

export default Products;
