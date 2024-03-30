'use client';
import { Button } from '@/components/ui/button';
import { useSession, signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Signin = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    redirect('/');
  }

  return (
    <>
      Not signed in <br />
      <Button variant="destructive" onClick={() => signIn('google')}>
        Sign in with Google
      </Button>
    </>
  );
};

export default Signin;
