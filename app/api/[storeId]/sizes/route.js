import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const POST = async (req, { params }) => {
  try {
    const { storeId } = params;
    const session = await getAuthSession();
    const body = await req.json();

    const { name, value } = body;

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    if (!storeId) {
      return new NextResponse('StoreId is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userEmail: session?.user?.email },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    // const existingBillboard = await prisma.billboard.findFirst({
    //   where: { label },
    // });

    // if (existingBillboard) {
    //   return new NextResponse('Billboard already exists', {
    //     status: 400,
    //   });
    // }

    const size = await prisma.size.create({
      data: { name, value, storeId },
    });

    return new NextResponse(JSON.stringify(size, { status: 200 }));
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  const { storeId } = params;

  if (!storeId) {
    return new NextResponse('StoreID is required', { status: 401 });
  }

  const sizes = await prisma.size.findMany({
    where: { storeId },
  });

  return new NextResponse(JSON.stringify(sizes, { status: 200 }));
};
