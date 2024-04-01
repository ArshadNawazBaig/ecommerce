import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const POST = async (req, { params }) => {
  try {
    const { storeId } = params;
    const session = await getAuthSession();
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

    if (!session) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

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

    const product = await prisma.product.create({
      data: {
        storeId,
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        sizeId,
        colorId,
        desc: '',
        images: {
          createMany: {
            data: [...images.map((image) => image)],
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(product, { status: 200 }));
  } catch (error) {
    console.log(error, 'error');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  const { storeId } = params;
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId') || undefined;
  const sizeId = searchParams.get('sizeId') || undefined;
  const colorId = searchParams.get('colorId') || undefined;
  const isFeatured = searchParams.get('isFeatured');

  if (!storeId) {
    return new NextResponse('StoreID is required', { status: 401 });
  }

  const products = await prisma.product.findMany({
    where: {
      storeId,
      categoryId,
      sizeId,
      colorId,
      isFeatured: isFeatured ? true : undefined,
    },
    include: {
      category: true,
      size: true,
      color: true,
      images: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return new NextResponse(JSON.stringify(products), { status: 200 });
};
