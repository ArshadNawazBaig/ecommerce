import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  try {
    const { colorId } = params;

    const color = await prisma.color.findUnique({
      where: { id: colorId },
    });

    if (!color) {
      return new NextResponse('Color not found', { status: 404 });
    }

    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { colorId, storeId } = params;
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

    const color = await prisma.color.updateMany({
      where: { id: colorId },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { colorId, storeId } = params;
    const session = await getAuthSession();
    const { email } = session?.user;

    if (!email) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!colorId) {
      return new NextResponse('Color ID not found', { status: 404 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userEmail: session?.user?.email },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const color = await prisma.color.deleteMany({
      where: { id: colorId },
    });

    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
