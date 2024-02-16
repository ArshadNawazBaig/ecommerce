import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  const { id } = params;
  const session = await getAuthSession();
  const email = session?.user?.email;

  if (!email) {
    return new NextResponse('Unauthenticated', { status: 401 });
  }

  const store = await prisma.store.findUnique({
    where: { id, userEmail: email },
  });

  if (!store) {
    return new NextResponse('Store not found', { status: 404 });
  }

  return NextResponse.json(store, { status: 200 });
};
