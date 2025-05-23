import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/prisma';

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_: Request, context: Context) {
  const params = await context.params;

  const post = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, context: Context) {
  const params = await context.params;
  const body = await req.json();
  const { title, content } = body;

  const updated = await prisma.post.update({
    where: { id: params.id },
    data: { title, content },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, context: Context) {
  const params = await context.params;

  await prisma.post.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}