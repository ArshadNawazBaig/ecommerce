import React from 'react';
import ColorForm from './components/color-form';
import prisma from '@/utils/connect';

const Color = async ({ params }) => {
  const color = await prisma?.color?.findUnique({
    where: { id: params.colorId },
  });

  return (
    <div>
      <ColorForm color={color} />
    </div>
  );
};

export default Color;
