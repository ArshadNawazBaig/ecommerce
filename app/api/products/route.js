import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { getUniqueSlug } from '@/utils/slugify';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const products = await prisma.product.findMany();
    return new NextResponse(JSON.stringify(products, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
};

export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: 'User not authenticated' }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        ...body,
        userEmail: session.user.email,
        slug: await getUniqueSlug(body.name, 1, 'product'),
      },
    });

    return new NextResponse(JSON.stringify(product, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
};
