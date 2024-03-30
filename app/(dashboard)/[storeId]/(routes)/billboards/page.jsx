import Heading from '@/components/typography/heading';
import React from 'react';
import BillboardClient from './components/client';

const Billboards = async ({ params }) => {
  const { storeId } = params;
  const billboards = await prisma.billboard.findMany({
    where: { storeId },
  });
  return (
    <div>
      <BillboardClient data={billboards} />
    </div>
  );
};

export default Billboards;
