import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  try {
    const { categoryId } = params;

    const category = await prisma.categories.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return new NextResponse('Category not found', { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { categoryId, storeId } = params;
    const session = await getAuthSession();
    const { email } = session?.user;
    const body = await req.json();

    const { name, billboardId } = body;

    if (!email) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard ID is required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userEmail: session?.user?.email },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const category = await prisma.categories.updateMany({
      where: { id: categoryId },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { categoryId, storeId } = params;
    const session = await getAuthSession();
    const { email } = session?.user;

    if (!email) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse('Category ID not found', { status: 404 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userEmail: session?.user?.email },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const category = await prisma.categories.deleteMany({
      where: { id: categoryId },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
