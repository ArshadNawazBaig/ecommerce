import StoreSettingsForm from '@/components/store-settings-form';
import React from 'react';
import prisma from '@/utils/connect';
import { getAuthSession } from '@/utils/auth';
import { redirect } from 'next/navigation';

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
