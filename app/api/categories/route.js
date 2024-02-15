import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { getUniqueSlug } from '@/utils/slugify';
import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
  const session = await getAuthSession();

  try {
    const body = await req.json();
    const category = await prisma.categories.create({
      data: {
        ...body,
        slug: await getUniqueSlug(body.name, 1, 'categories'),
      },
    });

    return new NextResponse(JSON.stringify(category, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
};
