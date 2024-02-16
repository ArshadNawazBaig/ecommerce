'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const Signin = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session?.user) {
    redirect('/');
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('google')}>Sign in</button>
    </>
  );
};

export default Signin;
