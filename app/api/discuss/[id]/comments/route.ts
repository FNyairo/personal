import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getGeoLocation } from '@/lib/utils';
import { validateAdminRequest } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { userName, userEmail, content, name, email } = await req.json();
  const resolvedName = userName || name;
  const resolvedEmail = userEmail || email;

  if (!resolvedName || !resolvedEmail || !content) {
    return NextResponse.json({ error: 'name, email and content required.' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  const geo = await getGeoLocation(ip);

  // Check if admin
  const adminPayload = await validateAdminRequest(req);
  const isAdmin = !!adminPayload;

  const comment = await prisma.discussionComment.create({
    data: {
      threadId: params.id,
      userName: isAdmin ? 'Franklin Nyairo' : resolvedName,
      userEmail: resolvedEmail,
      content,
      isAdmin,
      ipAddress: ip,
      country: geo?.country ?? null,
      city: geo?.city ?? null,
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
