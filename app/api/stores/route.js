import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const session = await getAuthSession();
    const body = await req.json();

    const { name } = body;

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const existingStore = await prisma.store.findFirst({
      where: { name, userEmail: session?.user?.email },
    });

    if (existingStore) {
      return new NextResponse('Store with this name is already exists', {
        status: 400,
      });
    }

    const store = await prisma.store.create({
      data: { name, userEmail: session?.user?.email },
    });

    return new NextResponse(JSON.stringify(store, { status: 200 }));
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const GET = async (req, res) => {
  const session = await getAuthSession();
  const { email } = session?.user;

  if (!email) {
    return new NextResponse('Unauthenticated', { status: 401 });
  }

  const stores = await prisma.store.findMany({
    where: { userEmail: email },
  });

  return new NextResponse(JSON.stringify(stores), { status: 200 });
};
