'use client';
import { useGetStoreByIdQuery } from '@/lib/features/Stores';
import { redirect } from 'next/navigation';
import React from 'react';

const Store = ({ params }) => {
  const {
    data: store,
    error,
    isLoading,
    isError,
  } = useGetStoreByIdQuery(params.storeId);

  if (!isLoading && !store) {
    redirect('/');
  }

  return <div>{store?.id}</div>;
};

export default Store;
