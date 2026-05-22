import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/blog/[slug]/comments — fetch approved comments for a post
export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  if (!process.env.DATABASE_URL) return NextResponse.json([]);
  try {
    const post = await prisma.post.findUnique({ where: { slug: params.slug }, select: { id: true } });
    if (!post) return NextResponse.json([]);

    const comments = await prisma.postComment.findMany({
      where: { postId: post.id, approved: true },
      orderBy: { createdAt: 'asc' },
      select: { id: true, name: true, content: true, createdAt: true },
    });
    return NextResponse.json(comments);
  } catch {
    return NextResponse.json([]);
  }
}

// POST /api/blog/[slug]/comments — submit a new comment
export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Comments not available yet.' }, { status: 503 });
  }
  try {
    const { name, email, content } = await req.json();

    if (!name?.trim() || !email?.trim() || !content?.trim()) {
      return NextResponse.json({ error: 'Name, email, and comment are required.' }, { status: 400 });
    }
    if (content.trim().length > 2000) {
      return NextResponse.json({ error: 'Comment too long (max 2000 characters).' }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: { slug: params.slug, published: true },
      select: { id: true },
    });
    if (!post) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;

    const comment = await prisma.postComment.create({
      data: { postId: post.id, name: name.trim(), email: email.trim(), content: content.trim(), ipAddress: ip },
      select: { id: true, name: true, content: true, createdAt: true },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
