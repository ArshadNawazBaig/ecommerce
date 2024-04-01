'use client';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/typography/heading';
import { Separator } from '@/components/ui/separator';
import React, { useEffect } from 'react';
import { columns } from './columns';
import { format } from 'date-fns';

const OrderClient = ({ data }) => {
  const formatedData = data?.map((data) => ({
    id: data.id,
    isPaid: data.isPaid,
    phone: data.phone,
    address: data.address,
    products: data.orderItems.map(((item) => item.product.name).join(', ')),
    totalPrice: data.orderItems.reduce((total, item) => {
      return total + parseInt(item.price, 10);
    }, 0),
    createdAt: format(data.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading
          title={`Orders (${data?.length})`}
          subtitle="Manage your orders"
        />
      </div>
      <Separator className="mt-4 mb-4" />
      <DataTable
        columns={columns}
        data={formatedData?.length > 0 && formatedData}
        searchParams="id"
      />
    </div>
  );
};

export default OrderClient;
