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

const CategoriesClient = ({ data }) => {
  console.log(data, 'billboards');
  const { storeId } = useParams();
  const router = useRouter();
  const formatedData =
    data &&
    data?.map((data) => ({
      id: data.id,
      name: data.name,
      billboard: data.billboard.label,
      createdAt: format(data.createdAt, 'MMMM do, yyyy'),
    }));
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading
          title={`Categories (${data?.length || 0})`}
          subtitle="Manage your categories"
        />
        <Button onClick={() => router.push(`/${storeId}/categories/new`)}>
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

export default CategoriesClient;
