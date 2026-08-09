import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certifications | FSSC 22000, ISO 22000, NABL, FSSAI, Halal & More | LV Spices India',
  description: 'LV Spices holds 10+ international food safety certifications: FSSC 22000, ISO 22000, HACCP, NABL (accredited lab), USFDA, FSSAI, Halal, Kosher, and Sedex. Every certificate is audited by third-party bodies including Bureau Veritas and SGS. View & download our full certification portfolio.',
  keywords: [
    'FSSC 22000 certified spice manufacturer India',
    'ISO 22000 spice manufacturer',
    'NABL accredited spice lab India',
    'FSSAI certified spice exporter',
    'Halal certified spices India',
    'USFDA registered spice facility India',
    'Sedex certified food supplier India',
    'spice manufacturer certifications India',
    'food safety certified spice manufacturer',
    'HACCP spice manufacturer India',
  ],
  openGraph: {
    title: 'Food Safety Certifications | FSSC 22000, ISO 22000, NABL & More | LV Spices',
    description: '10+ international certifications including FSSC 22000, NABL, USFDA, Halal, and Sedex. LV Spices is India\'s most certified spice manufacturer for global export compliance.',
    images: [{ url: '/images/certs/fssc.png', width: 1200, height: 630, alt: 'LV Spices Certifications — FSSC 22000, ISO 22000, NABL' }],
    type: 'website',
    locale: 'en_US',
    siteName: 'LV Spices',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Food Safety Certifications | LV Spices India',
    description: 'FSSC 22000, ISO 22000, NABL, USFDA, FSSAI, Halal, Sedex — 10+ certifications proving LV Spices\' global compliance.',
    images: ['/images/certs/fssc.png'],
  },
  alternates: { canonical: 'https://lvspices.com/certifications' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
