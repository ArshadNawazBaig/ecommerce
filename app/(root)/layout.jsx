import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { redirect } from 'next/navigation';
import React from 'react';

const SetupLayout = async ({ children }) => {
  const session = await getAuthSession();
  const { email } = session?.user;

  if (!email) {
    redirect('/auth/signin');
  }

  const existingStore = await prisma.store.findFirst({
    where: { userEmail: email },
  });

  if (existingStore) {
    redirect(`/dashboard/${existingStore?.id}`);
  }

  return <>{children}</>;
};

export default SetupLayout;
