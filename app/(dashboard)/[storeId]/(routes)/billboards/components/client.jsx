'use client';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/typography/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useGetBillboardsQuery } from '@/lib/features/Billboards';
import { PlusIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { columns } from './columns';
import { format } from 'date-fns';

const BillboardClient = ({ data }) => {
  const { storeId } = useParams();
  const router = useRouter();
  const formatedData = data?.map((data) => ({
    id: data.id,
    label: data.label,
    createdAt: format(data.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading
          title={`Billboards (${data?.length})`}
          subtitle="Manage your billboards"
        />
        <Button onClick={() => router.push(`/${storeId}/billboards/new`)}>
          <PlusIcon className="mr-2 w-4 h-4" /> Add New
        </Button>
      </div>
      <Separator className="mt-4 mb-4" />
      <DataTable
        columns={columns}
        data={formatedData?.length > 0 && formatedData}
        searchParams="label"
      />
    </div>
  );
};

export default BillboardClient;
