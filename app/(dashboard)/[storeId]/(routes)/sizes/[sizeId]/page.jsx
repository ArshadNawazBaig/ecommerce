import React from 'react';
import SizeForm from './components/size-form';
import prisma from '@/utils/connect';

const Size = async ({ params }) => {
  const size = await prisma?.size?.findUnique({
    where: { id: params.sizeId },
  });

  return (
    <div>
      <SizeForm size={size} />
    </div>
  );
};

export default Size;
