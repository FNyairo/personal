import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAdminRequest } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  const admin = await validateAdminRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  await prisma.post.delete({ where: { id: params.slug } });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
  const admin = await validateAdminRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const body = await req.json();
  const post = await prisma.post.update({ where: { id: params.slug }, data: body });
  return NextResponse.json(post);
}
