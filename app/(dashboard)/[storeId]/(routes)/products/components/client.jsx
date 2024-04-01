'use client';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/typography/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PlusIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { columns } from './columns';
import { format } from 'date-fns';

const ProductClient = ({ data }) => {
  const { storeId } = useParams();
  const router = useRouter();
  const formatedData = data?.map((data) => ({
    id: data.id,
    name: data.name,
    price: data.price,
    desc: data.desc,
    isFeatured: data.isFeatured,
    isArchived: data.isArchived,
    category: data.category.name,
    color: data.color.value,
    size: data.size.name,
    createdAt: format(data.createdAt, 'MMMM do, yyyy'),
  }));
  console.log(formatedData, 'formated data');
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading
          title={`Products (${data?.length})`}
          subtitle="Manage your products"
        />
        <Button onClick={() => router.push(`/${storeId}/products/new`)}>
          <PlusIcon className="mr-2 w-4 h-4" /> Add New
        </Button>
      </div>
      <Separator className="mt-4 mb-4" />
      <DataTable
        columns={columns}
        data={formatedData?.length > 0 && formatedData}
        searchParams="name"
      />
    </div>
  );
};

export default ProductClient;
