'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

const DashboardLayout = ({ children }) => {
  const { data: session, status } = useSession();
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return <div>{children}</div>;
};

export default DashboardLayout;
