'use client';

import { onOpen } from '@/lib/slices/ModalSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isOpen) {
      dispatch(onOpen());
    }
  }, [isOpen, onOpen]);
  return (
    <div>
      <h1>Hello Next.js!</h1>
    </div>
  );
}
