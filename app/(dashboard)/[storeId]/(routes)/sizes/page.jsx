import React from 'react';
import SizesClient from './components/client';

const Sizes = async ({ params }) => {
  const { storeId } = params;
  const sizes = await prisma.size.findMany({
    where: { storeId },
  });
  return (
    <div>
      <SizesClient data={sizes?.length > 0 && sizes} />
    </div>
  );
};

export default Sizes;
