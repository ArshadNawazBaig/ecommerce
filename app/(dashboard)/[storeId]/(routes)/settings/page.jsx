import StoreSettingsForm from '@/components/store-settings-form';
import Heading from '@/components/typography/heading';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import prisma from '@/utils/connect';
import { getAuthSession } from '@/utils/auth';
import { redirect } from 'next/navigation';
import { useDeleteStoreMutation } from '@/lib/features/Stores';

const Settings = async ({ params }) => {
  const session = await getAuthSession();

  const store = await prisma.store.findFirst({
    where: { id: params.storeId },
  });

  if (!session?.user?.email) {
    redirect('/signin');
  }

  if (!store) {
    redirect('/');
  }

  return (
    <div className="">
      <StoreSettingsForm initialData={store} />
    </div>
  );
};

export default Settings;
