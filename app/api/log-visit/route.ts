export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getGeoLocation } from '@/lib/utils';

export async function POST(req: NextRequest) {
  // Skip silently when no database is configured
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: true });
  }
  try {
    const { ip, page, userAgent } = await req.json();
    const geo = await getGeoLocation(ip);

    await prisma.visitorLog.create({
      data: {
        ipAddress: ip,
        pageVisited: page,
        userAgent: userAgent ?? null,
        country: geo?.country ?? null,
        countryCode: geo?.countryCode ?? null,
        city: geo?.city ?? null,
        region: geo?.region ?? null,
        lat: geo?.lat ?? null,
        lon: geo?.lon ?? null,
      },
    });
  } catch {
    // Visitor logging is best-effort — never block the request
  }
  return NextResponse.json({ ok: true });
}
