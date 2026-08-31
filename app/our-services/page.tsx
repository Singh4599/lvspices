import type { Metadata } from 'next';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesIntro from '@/components/services/ServicesIntro';
import ServicesList from '@/components/services/ServicesList';
import ServicesBenefits from '@/components/services/ServicesBenefits';

export const metadata: Metadata = {
  title: 'Our Services | LV Spices',
  description: 'Explore the premium services offered by LV Spices, from private labeling to bulk spice manufacturing and custom blending.',
  keywords: [
    'LV Spices services',
    'spice private labeling',
    'bulk spice manufacturing',
    'custom spice blending',
    'OEM spices India',
  ],
  openGraph: {
    title: 'Our Services | LV Spices',
    description: 'Explore our comprehensive spice manufacturing services, including OEM, private label, and custom blends.',
    images: [{ url: '/images/hero-bowl.png', width: 1200, height: 630, alt: 'LV Spices Services' }],
    type: 'website',
    locale: 'en_US',
    siteName: 'LV Spices',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | LV Spices',
    description: 'Explore our comprehensive spice manufacturing services, including OEM, private label, and custom blends.',
    images: ['/images/hero-bowl.png'],
  },
  alternates: { canonical: 'https://lvspices.com/our-services' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const servicesFAQs = [
  {
    question: 'What services does LV Spices provide?',
    answer: 'LV Spices provides end-to-end spice manufacturing services including bulk supply, private labeling, OEM packaging, and custom spice blend development.',
  },
  {
    question: 'Do you offer private labeling for spices?',
    answer: 'Yes, we specialize in private labeling and OEM services, allowing you to launch your own spice brand with our premium, certified products.',
  },
];

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Our Services', url: '/our-services' },
];

export default function OurServicesPage() {
  return (
    <main>
      {/* ── Structured Data (AEO + GEO) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(servicesFAQs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* ── 01 Cinematic Hero ── */}
      <ServicesHero />

      {/* ── 02 Services Overview / Intro ── */}
      <ServicesIntro />

      {/* ── 03 Services List ── */}
      <ServicesList />

      {/* ── 04 Why Choose Us (Benefits) ── */}
      <ServicesBenefits />
    </main>
  );
}
