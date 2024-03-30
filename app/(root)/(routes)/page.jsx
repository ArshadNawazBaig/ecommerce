'use client';

import { onOpen } from '@/lib/slices/ModalSlice';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SetupPage() {
  const { isOpen } = useSelector((state) => state.modal);

  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  if (status === 'unauthenticated') {
    redirect('/signin');
  }

  useEffect(() => {
    if (!isOpen) {
      dispatch(onOpen());
    }
  }, [isOpen, onOpen]);

  return null;
}
