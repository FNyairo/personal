export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getGeoLocation } from '@/lib/utils';

const OWNER_EMAIL = 'nyairo7@gmail.com';

async function sendEmail(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith('re_...')) return; // skip if not configured

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Franklin Nyairo Website <onboarding@resend.dev>',
      to: [OWNER_EMAIL],
      subject,
      html,
    }),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'All fields required.' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  const geo = await getGeoLocation(ip);

  // Save to DB if available
  if (process.env.DATABASE_URL) {
    await prisma.contactMessage.create({
      data: {
        name: name.trim(), email: email.trim(), message: message.trim(),
        ipAddress: ip,
        country: geo?.country ?? null,
        city: geo?.city ?? null,
      },
    }).catch(() => {});
  }

  // Send email notification
  await sendEmail(
    `New message from ${name} — franklinnyairo.com`,
    `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f172a;color:#e2e8f0;border-radius:12px;">
      <h2 style="color:#60a5fa;margin-bottom:4px;">New Contact Message</h2>
      <p style="color:#64748b;font-size:13px;margin-top:0;">Received via franklinnyairo.com</p>
      <hr style="border:none;border-top:1px solid #1e293b;margin:16px 0;" />
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#94a3b8;width:80px;">Name</td><td style="padding:8px 0;color:#f1f5f9;font-weight:600;">${name}</td></tr>
        <tr><td style="padding:8px 0;color:#94a3b8;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#60a5fa;">${email}</a></td></tr>
        ${geo?.city ? `<tr><td style="padding:8px 0;color:#94a3b8;">Location</td><td style="padding:8px 0;color:#f1f5f9;">${geo.city}, ${geo.country}</td></tr>` : ''}
      </table>
      <hr style="border:none;border-top:1px solid #1e293b;margin:16px 0;" />
      <h3 style="color:#e2e8f0;margin-bottom:8px;">Message</h3>
      <p style="color:#cbd5e1;line-height:1.7;white-space:pre-wrap;">${message}</p>
      <hr style="border:none;border-top:1px solid #1e293b;margin:24px 0 16px;" />
      <p style="color:#475569;font-size:12px;">Reply directly to this email to respond to ${name}.</p>
    </div>
    `
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('fn_admin_token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json([]);

  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(messages);
}
