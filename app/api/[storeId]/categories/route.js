import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const POST = async (req, { params }) => {
  try {
    const { storeId } = params;
    const session = await getAuthSession();
    const body = await req.json();

    const { name, billboardId } = body;

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
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

    const category = await prisma.categories.create({
      data: { name, billboardId, storeId },
    });

    return new NextResponse(JSON.stringify(category, { status: 200 }));
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  const { storeId } = params;

  if (!storeId) {
    return new NextResponse('StoreID is required', { status: 401 });
  }

  const categories = await prisma.categories.findMany({
    where: { storeId },
  });

  return new NextResponse(JSON.stringify(categories), { status: 200 });
};
