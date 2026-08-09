import type { Metadata } from 'next';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import AboutHero from '@/components/about/AboutHero';
import OriginStory from '@/components/about/OriginStory';
import JourneyTimeline from '@/components/about/JourneyTimeline';
import MarqueeSection from '@/components/about/MarqueeSection';
import FarmToFactory from '@/components/about/FarmToFactory';
import TechProcess from '@/components/about/TechProcess';
import GlobalReach from '@/components/about/GlobalReach';
import BenefitsGrid from '@/components/about/BenefitsGrid';
import FinalStoryCTA from '@/components/about/FinalStoryCTA';

export const metadata: Metadata = {
  title: 'About LV Spices | India\'s Trusted Spice Manufacturer & Exporter Since 1975',
  description: 'Founded in 1975, LV Spices (Chillito Exports) is a Mumbai-based FSSC 22000-certified spice manufacturer with 50+ years of export experience. We serve bulk buyers, OEM clients, and private label brands across 40+ countries with 500+ SKUs — ground spices, whole spices, masalas, and custom blends.',
  keywords: [
    'LV Spices history',
    'Chillito Exports Mumbai',
    'Indian spice manufacturer since 1975',
    'about LV Spices',
    'spice manufacturer India 50 years',
    'FSSC 22000 spice manufacturer India',
    'bulk spice exporter Mumbai',
    'trusted spice supplier India',
    'Indian spice export company',
    'spice manufacturer Chillito Exports',
  ],
  openGraph: {
    title: 'About LV Spices | 50 Years of Trusted Spice Manufacturing Since 1975',
    description: 'Five decades of certified spice manufacturing from Mumbai, India — bulk spices, OEM, private label & custom blends exported to 40+ countries. FSSC 22000, ISO 22000, NABL, Halal certified.',
    images: [{ url: '/images/hero-bowl.png', width: 1200, height: 630, alt: 'LV Spices — India Trusted Spice Manufacturer Since 1975' }],
    type: 'website',
    locale: 'en_US',
    siteName: 'LV Spices',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About LV Spices | India\'s Trusted Spice Manufacturer Since 1975',
    description: '50 years of certified spice manufacturing — bulk, OEM, private label, custom blends. 40+ countries. FSSC 22000 certified.',
    images: ['/images/hero-bowl.png'],
  },
  alternates: { canonical: 'https://lvspices.com/about-us' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const aboutFAQs = [
  {
    question: 'How long has LV Spices been manufacturing spices?',
    answer: 'LV Spices (operating under Chillito Exports) has been manufacturing and exporting premium-quality spices since 1975 — over 50 years of proven expertise in the global spice trade.',
  },
  {
    question: 'What certifications does LV Spices hold?',
    answer: 'LV Spices holds FSSC 22000, ISO 22000, HACCP, NABL (accredited lab), FSSAI, FDA, Halal, and Sedex certifications — meeting the regulatory requirements of Europe, Americas, Middle East, and Asia-Pacific markets.',
  },
  {
    question: 'Where is LV Spices located?',
    answer: 'LV Spices is headquartered at 12, Marine House, 93 Dr Maheshwari Road, Mumbai 400009, India — with manufacturing facilities and a NABL-accredited quality control laboratory.',
  },
  {
    question: 'Which countries does LV Spices export to?',
    answer: 'LV Spices exports to 40+ countries including the United States, United Kingdom, Germany, Netherlands, Canada, Australia, UAE, Saudi Arabia, Singapore, Malaysia, and South Africa.',
  },
  {
    question: 'What makes LV Spices different from other Indian spice manufacturers?',
    answer: 'LV Spices uses proprietary CFG Science (Cryogenic-Forced Grinding at -196°C) which preserves up to 97% of volatile oils, ensuring superior aroma and flavor. Combined with steam sterilization, NABL lab testing, and 50+ years of export expertise, LV Spices delivers consistently export-grade quality.',
  },
];

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'About Us', url: '/about-us' },
];


export default function AboutUsPage() {
  return (
    <main>
      {/* ── Structured Data (AEO + GEO) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(aboutFAQs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* ── 01 Cinematic Hero ── */}
      <AboutHero />

      {/* ── 02 Origin 1975 ── */}
      <OriginStory />

      {/* ── 03 Timeline ── */}
      <JourneyTimeline />

      {/* ── Marquee strip (velocity text + image + curved arc) ── */}
      <MarqueeSection />

      {/* ── 04 Farm to Factory ── */}
      <FarmToFactory />

      {/* ── 05 Technology Process ── */}
      <TechProcess />

      {/* ── 06 Global Reach (3D Globe) ── */}
      <GlobalReach />

      {/* ── 07 What Sets Us Apart (dark) ── */}
      <BenefitsGrid />

      {/* ── 08 Final CTA ── */}
      <FinalStoryCTA />
    </main>
  );
}
