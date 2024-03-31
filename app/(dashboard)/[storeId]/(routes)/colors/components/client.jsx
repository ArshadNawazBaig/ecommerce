'use client';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/typography/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PlusIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { columns } from './columns';
import { format } from 'date-fns';

const ColorsClient = ({ data }) => {
  const { storeId } = useParams();
  const router = useRouter();
  const formatedData =
    data &&
    data?.map((data) => ({
      id: data.id,
      name: data.name,
      value: data.value,
      createdAt: format(data.createdAt, 'MMMM do, yyyy'),
    }));
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading
          title={`Colors (${data?.length || 0})`}
          subtitle="Manage your colors"
        />
        <Button onClick={() => router.push(`/${storeId}/colors/new`)}>
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

export default ColorsClient;
