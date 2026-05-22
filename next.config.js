/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'ea-tel.eu' },
      { protocol: 'https', hostname: 'www.novia.fi' },
      { protocol: 'https', hostname: 'researchportal.helsinki.fi' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  output: 'standalone',
};

module.exports = nextConfig;
