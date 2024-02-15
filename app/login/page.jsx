'use client';
import {
  useGetProductsQuery,
  useLazyGetProductsQuery,
} from '@/lib/features/Products';
import { useSession, signIn, signOut } from 'next-auth/react';

const Login = () => {
  const { data: session } = useSession();
  const [getProducts, { isError, isLoading, data }] = useLazyGetProductsQuery();

  const handleGetProducts = async () => {
    // const product = {
    //   name: 'Oneplue 9 pro',
    //   desc: 'Oneplue 9 pro',
    //   img: 'new image',
    //   categorySlug: 'cooking',
    //   userEmail: 'arshadnawazbaig@gmail.com',
    // };
    // await addProduct(product);
  };
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>{' '}
        <button className="py-2 px-4 bg-blue-700" onClick={() => getProducts()}>
          {isLoading ? 'Loading...' : 'Get Products'}
        </button>
        <ul>{/* {data?.} */}</ul>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('google')}>Sign in</button>
    </>
  );
};

export default Login;
