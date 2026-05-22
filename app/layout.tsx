import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://franklinnyairo.com'),
  title: {
    default: 'Franklin Nyairo — Where Education Meets the Sea',
    template: '%s | Franklin Nyairo',
  },
  description:
    'Instructional designer, EdTech researcher, and maritime education instructor designing evidence-based learning at the crossroads of pedagogy, technology, and the open sea.',
  keywords: [
    'TPACK', 'Maritime Education', 'EdTech', 'Instructional Design',
    'EFL', 'Maritime English', 'SMCP', 'Novia University', 'Franklin Nyairo',
    'iMASTER', 'DigiMar', 'IMPACT Kenya',
  ],
  authors: [{ name: 'Franklin Nyairo', url: 'https://franklinnyairo.com' }],
  creator: 'Franklin Nyairo',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://franklinnyairo.com',
    siteName: 'Franklin Nyairo',
    title: 'Franklin Nyairo | EdTech Researcher & Maritime Education Instructor',
    description:
      'Instructional Designer, EdTech Researcher, and Maritime Education Instructor. Project Manager at Novia UAS. PhD Candidate, University of Helsinki.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Franklin Nyairo' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SpaceAndOrTime',
    creator: '@SpaceAndOrTime',
    title: 'Franklin Nyairo | EdTech Researcher & Maritime Education Instructor',
    description: 'Instructional Designer, EdTech Researcher, Maritime Education Instructor. Novia UAS | University of Helsinki.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
