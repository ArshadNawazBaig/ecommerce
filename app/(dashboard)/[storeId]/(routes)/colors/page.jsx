import React from 'react';
import ColorsClient from './components/client';

const Colors = async ({ params }) => {
  const { storeId } = params;
  const colors = await prisma.color.findMany({
    where: { storeId },
  });
  return (
    <div>
      <ColorsClient data={colors?.length > 0 && colors} />
    </div>
  );
};

export default Colors;
