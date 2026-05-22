export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getGeoLocation } from '@/lib/utils';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string | null;
  const file = formData.get('document') as File | null;

  if (!name || !email || !subject) {
    return NextResponse.json({ error: 'name, email and subject required.' }, { status: 400 });
  }

  // Validate file
  if (file && file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'File must be under 10MB.' }, { status: 400 });
  }
  if (file && !['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
    return NextResponse.json({ error: 'Only PDF or DOCX files accepted.' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  const geo = await getGeoLocation(ip);

  // Create thread first to get ID
  const thread = await prisma.discussionThread.create({
    data: {
      subject, userName: name, userEmail: email,
      message: message ?? null,
      ipAddress: ip,
      country: geo?.country ?? null,
      city: geo?.city ?? null,
    },
  });

  // Upload document if present
  let documentUrl: string | null = null;
  if (file) {
    const ext = file.name.split('.').pop();
    const path = `threads/${thread.id}/${Date.now()}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    const { data, error } = await supabaseAdmin.storage.from('documents').upload(path, arrayBuffer, {
      contentType: file.type,
      cacheControl: '3600',
    });
    if (!error && data) {
      const { data: pub } = supabaseAdmin.storage.from('documents').getPublicUrl(data.path);
      documentUrl = pub.publicUrl;
    }
  }

  // Update with doc URL
  if (documentUrl) {
    await prisma.discussionThread.update({ where: { id: thread.id }, data: { documentUrl } });
  }

  return NextResponse.json({ ok: true, threadId: thread.id }, { status: 201 });
}

export async function GET() {
  const threads = await prisma.discussionThread.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { comments: true } } },
  });
  return NextResponse.json(threads);
}
