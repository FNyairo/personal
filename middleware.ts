import { NextRequest, NextResponse } from 'next/server';
import { validateAdminRequest } from '@/lib/auth';

// Pages that do not need logging
const SKIP_PATHS = [
  '/_next', '/favicon', '/robots', '/sitemap',
  '/api/auth', '/api/upload', '.ico', '.png', '.jpg', '.svg',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin route protection ────────────────────────────────────────────────
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const payload = await validateAdminRequest(req);
    if (!payload) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // ── IP / Visitor logging ──────────────────────────────────────────────────
  // Only log when DATABASE_URL is configured (skip silently in dev without DB)
  const shouldSkip = SKIP_PATHS.some((p) => pathname.startsWith(p));
  if (!shouldSkip && process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('your-')) {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    // Fire-and-forget — don't await (keeps request fast)
    fetch(`${req.nextUrl.origin}/api/log-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip,
        page: pathname,
        userAgent: req.headers.get('user-agent') ?? '',
      }),
    }).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
