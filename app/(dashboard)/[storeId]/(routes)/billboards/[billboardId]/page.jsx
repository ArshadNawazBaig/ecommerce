import React from 'react';
import BillboardForm from './components/billboard-form';
import prisma from '@/utils/connect';

const Billboard = async ({ params }) => {
  const billboard = await prisma?.billboard?.findUnique({
    where: { id: params.billboardId },
  });

  return (
    <div>
      <BillboardForm billboard={billboard} />
    </div>
  );
};

export default Billboard;
