'use client';
import React from 'react';
import Navbar from './navbar';
import { useSession, signOut } from 'next-auth/react';

const NavWrapper = () => {
  const { data: session } = useSession();
  return (
    <>
      <Navbar session={session} signOut={signOut} />
    </>
  );
};

export default NavWrapper;
