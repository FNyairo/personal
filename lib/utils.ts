export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function estimateReadingTime(content: unknown): number {
  const text = JSON.stringify(content);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function truncate(text: string, length = 160): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '…';
}

export async function getGeoLocation(ip: string) {
  if (!ip || ip === '::1' || ip === '127.0.0.1') {
    return { country: 'Local', countryCode: 'LO', city: 'Localhost', region: '', lat: 0, lon: 0 };
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city,regionName,lat,lon`, {
      signal: AbortSignal.timeout(3000),
    });
    const data = await res.json();
    if (data.status !== 'success') return null;
    return {
      country: data.country,
      countryCode: data.countryCode,
      city: data.city,
      region: data.regionName,
      lat: data.lat,
      lon: data.lon,
    };
  } catch {
    return null;
  }
}
