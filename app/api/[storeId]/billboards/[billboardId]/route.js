import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  try {
    const { billboardId } = params;

    const billboard = await prisma.billboard.findUnique({
      where: { id: billboardId },
    });

    if (!billboard) {
      return new NextResponse('Billboard not found', { status: 404 });
    }

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { billboardId, storeId } = params;
    const session = await getAuthSession();
    const { email } = session?.user;
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!email) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image Url is required', { status: 400 });
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

    const billboard = await prisma.billboard.updateMany({
      where: { id: billboardId },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { billboardId, storeId } = params;
    const session = await getAuthSession();
    const { email } = session?.user;

    if (!email) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard ID not found', { status: 404 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userEmail: session?.user?.email },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const billboard = await prisma.billboard.deleteMany({
      where: { id: billboardId },
    });

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
