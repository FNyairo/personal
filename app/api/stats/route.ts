import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateAdminRequest } from '@/lib/auth';

export async function GET() {
  const stats = await prisma.stats.findMany();
  return NextResponse.json(stats);
}

export async function POST(req: NextRequest) {
  const admin = await validateAdminRequest(req);
  if (!admin) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const body = await req.json();
  const { id, value } = body;

  const stat = await prisma.stats.update({
    where: { id },
    data: { value: parseInt(value, 10) },
  });

  return NextResponse.json(stat);
}
