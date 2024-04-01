import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  try {
    const { productId } = params;

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images,
        category: true,
        size: true,
        color: true,
        isFeatured: true,
      },
    });

    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { productId, storeId } = params;
    const session = await getAuthSession();
    const { email } = session?.user;
    const body = await req.json();

    const {
      name,
      price,
      isFeatured,
      isArchived,
      categoryId,
      sizeId,
      colorId,
      images,
    } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('Category ID is required', { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse('Size ID is required', { status: 400 });
    }

    if (!colorId) {
      return new NextResponse('Color ID is required', { status: 400 });
    }

    if (!images && !images.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userEmail: session?.user?.email },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        colorId,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image) => image)],
          },
        },
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error, 'error');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { productId, storeId } = params;
    const session = await getAuthSession();
    const { email } = session?.user;

    if (!email) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!productId) {
      return new NextResponse('Product ID not found', { status: 404 });
    }

    const storeByUserId = await prisma.store.findFirst({
      where: { id: storeId, userEmail: session?.user?.email },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorised', { status: 403 });
    }

    const product = await prisma.product.deleteMany({
      where: { id: productId },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
