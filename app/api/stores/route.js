import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const { id } = await getAuthSession();
    const body = req.json();

    const { name } = body;

    if (!id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const store = await prisma.store.create({
      data: { name, id },
    });

    return NextResponse(JSON.stringify(store, { status: 200 }));
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
