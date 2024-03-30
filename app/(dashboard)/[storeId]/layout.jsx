'use client';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

const DashboardLayout = ({ children }) => {
  const { data: session, status } = useSession();
  if (status === 'unauthenticated') {
    redirect('/signin');
  }

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar className="min-w-[250px]" />
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
