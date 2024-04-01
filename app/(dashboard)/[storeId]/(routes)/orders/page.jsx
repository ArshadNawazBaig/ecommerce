import React from 'react';
import OrderClient from './components/client';
import prisma from '@/utils/connect';

const Orders = async ({ params }) => {
  const { storeId } = params;
  const orders = await prisma.order.findMany({
    where: { storeId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <div>
      <OrderClient data={orders} />
    </div>
  );
};

export default Orders;
