import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  try {
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
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { id } = params;
    const session = await getAuthSession();
    const { email } = session?.user;
    const body = await req.json();

    const { name } = body;

    if (!email) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const store = await prisma.store.updateMany({
      where: { id, userEmail: email },
      data: {
        name,
      },
    });

    if (!store) {
      return new NextResponse('Store not found', { status: 404 });
    }

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;
    const session = await getAuthSession();
    const { email } = session?.user;
    console.log(email, 'delete');

    if (!email) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    const billboard = await prisma.billboard.findFirst({
      where: { storeId: id },
    });

    if (billboard) {
      return NextResponse.json('You have active billboards', {
        status: 400,
      });
    }

    const store = await prisma.store.deleteMany({
      where: { id, userEmail: email },
    });

    console.log(store);

    if (!store) {
      return new NextResponse('Store not found', { status: 404 });
    }

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
