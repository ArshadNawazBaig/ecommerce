'use client';
import { useGetStoreByIdQuery } from '@/lib/features/Stores';
import { redirect } from 'next/navigation';
import React from 'react';

const Store = ({ params }) => {
  const {
    data: store,
    isLoading,
    isError,
  } = useGetStoreByIdQuery(params.storeId);

  if (!isLoading && !store) {
    redirect('/dashboard');
  }

  return <div>Store</div>;
};

export default Store;
