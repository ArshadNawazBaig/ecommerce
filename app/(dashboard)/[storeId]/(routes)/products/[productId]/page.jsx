import React from 'react';
import ProductForm from './components/product-form';
import prisma from '@/utils/connect';

const Product = async ({ params }) => {
  const product = await prisma?.product?.findUnique({
    where: { id: params.productId },
    include: {
      images: true,
    },
  });

  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
};

export default Product;
