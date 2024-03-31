import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  try {
    const { sizeId } = params;

    const size = await prisma.size.findUnique({
      where: { id: sizeId },
    });

    if (!size) {
      return new NextResponse('Size not found', { status: 404 });
    }

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { sizeId, storeId } = params;
    const session = await getAuthSession();
    const { email } = session?.user;
    const body = await req.json();

    const { name, value } = body;

    if (!email) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userEmail: session?.user?.email },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const size = await prisma.size.updateMany({
      where: { id: sizeId },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { sizeId, storeId } = params;
    const session = await getAuthSession();
    const { email } = session?.user;

    if (!email) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!sizeId) {
      return new NextResponse('Size ID not found', { status: 404 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userEmail: session?.user?.email },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const size = await prisma.size.deleteMany({
      where: { id: sizeId },
    });

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
