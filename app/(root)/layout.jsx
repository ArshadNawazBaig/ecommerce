import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { redirect } from 'next/navigation';
import React from 'react';

const SetupLayout = async ({ children }) => {
  const session = await getAuthSession();
  const { email } = session?.user || '';

  if (!email) {
    redirect('/signin');
  }

  const existingStore = await prisma.store.findFirst({
    where: { userEmail: email },
  });

  if (existingStore) {
    redirect(`/${existingStore?.id}`);
  }

  return <>{children}</>;
};

export default SetupLayout;
