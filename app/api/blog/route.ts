export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAdminRequest } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function POST(req: NextRequest) {
  const admin = await validateAdminRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const body = await req.json();
  const { title, slug, content, excerpt, coverImage, tags, published } = body;

  if (!title || !content) {
    return NextResponse.json({ error: 'title and content required' }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug: slug || slugify(title),
      content,
      excerpt: excerpt ?? '',
      coverImage: coverImage ?? 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      tags: Array.isArray(tags) ? tags : [],
      published: published ?? false,
      readingTime: Math.max(1, Math.ceil(JSON.stringify(content).split(/\s+/).length / 200)),
    },
  });

  return NextResponse.json(post, { status: 201 });
}

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, tags: true, readingTime: true, createdAt: true },
  });
  return NextResponse.json(posts);
}
