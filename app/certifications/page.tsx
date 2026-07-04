'use client';

import { Shield, CheckCircle, Award, Leaf, Globe, Scale, Heart, Microscope } from 'lucide-react';
import AnimatedHero from '@/components/animation/AnimatedHero';
import AnimatedCards from '@/components/animation/AnimatedCards';
import { AnimatedSectionHeader } from '@/components/animation/AnimatedSectionHeader';

const stats = [
  { value: '9+', label: 'Certifications', numeric: 9, suffix: '+' },
  { value: 'ISO 22000', label: 'Food Safety' },
  { value: 'NABL', label: 'Accredited Lab' },
  { value: '100%', label: 'Batch Tested' },
];

const certifications = [
  {
    number: '01',
    icon: <Shield className="h-7 w-7" />,
    title: 'ISO 9001:2015',
    subtitle: 'International Organization for Standardization',
    bullets: [
      'Quality Management System certified',
      'Covers manufacturing, processing, export',
      'Annual third-party surveillance audits',
      'Document-controlled process flows',
    ],
    badge: 'ACTIVE',
  },
  {
    number: '02',
    icon: <CheckCircle className="h-7 w-7" />,
    title: 'ISO 22000',
    subtitle: 'International Organization for Standardization',
    bullets: [
      'Food Safety Management System',
      'HACCP principles fully implemented',
      'Prerequisite programmes in place',
      'Critical Control Points monitored 24/7',
    ],
    badge: 'ACTIVE',
  },
  {
    number: '03',
    icon: <Award className="h-7 w-7" />,
    title: 'FSSAI Licensed',
    subtitle: 'Food Safety & Standards Authority of India',
    bullets: [
      'Manufacturing license — spices & seasonings',
      'Domestic + export market compliant',
      'Annual renewal with hygiene audit',
      'Batch-level FSSAI-ready documentation',
    ],
    badge: 'ACTIVE',
  },
  {
    number: '04',
    icon: <Leaf className="h-7 w-7" />,
    title: 'USDA Organic',
    subtitle: 'United States Department of Agriculture',
    bullets: [
      'NOP-compliant organic processing',
      'Segregated organic production lines',
      'Annual on-site USDA-accredited audit',
      'Farm-to-pack chain of custody',
    ],
    badge: 'ACTIVE',
  },
  {
    number: '05',
    icon: <Globe className="h-7 w-7" />,
    title: 'EU Organic',
    subtitle: 'European Commission',
    bullets: [
      'Regulation (EU) 2018/848 compliant',
      'Approved for all EU member states',
      'Organic equivalency verified annually',
      'Full traceability to certified farms',
    ],
    badge: 'ACTIVE',
  },
  {
    number: '06',
    icon: <Scale className="h-7 w-7" />,
    title: 'SEDEX-SMETA',
    subtitle: 'Supplier Ethical Data Exchange',
    bullets: [
      '4-pillar SMETA audit completed',
      'Labour standards — zero violations',
      'Health & safety systems verified',
      'Environment & business ethics reviewed',
    ],
    badge: 'ACTIVE',
  },
  {
    number: '07',
    icon: <Heart className="h-7 w-7" />,
    title: 'Kosher Certified',
    subtitle: 'Orthodox Union / Kashrut Authority',
    bullets: [
      'All spice products Kosher certified',
      'Pareve classification — no meat/dairy',
      'OU symbol on export documentation',
      'Annual ingredient re-verification',
    ],
    badge: 'ACTIVE',
  },
  {
    number: '08',
    icon: <Heart className="h-7 w-7" />,
    title: 'Halal Certified',
    subtitle: 'Halal Certification Authority',
    bullets: [
      'Sharia-compliant sourcing & processing',
      'No cross-contamination with prohibited items',
      'Halal symbol on all product documentation',
      'Covers GCC, SE Asia, EU Muslim market',
    ],
    badge: 'ACTIVE',
  },
  {
    number: '09',
    icon: <Microscope className="h-7 w-7" />,
    title: 'NABL Accredited',
    subtitle: 'National Accreditation Board for Testing',
    bullets: [
      'ISO/IEC 17025 accredited in-house lab',
      'HPLC, LCMS/MS, GCMS/MS capability',
      'Pesticide & mycotoxin testing',
      'ASTA colour + SHU pungency analysis',
    ],
    badge: 'ACTIVE',
  },
];

export default function CertificationsPage() {
  return (
    <>
      <AnimatedHero
        eyebrow="Trust & Compliance"
        title={<>Quality you<br /><span className="text-[#AC033B] italic font-serif font-medium">can trust.</span></>}
        description="9+ certifications. Every audit passed. Every standard exceeded. We don't chase badges — we document proof that the world's best buyers demand."
        stats={stats}
        imageSrc="/images/lab.png"
        imageAlt="LV Spices Quality Lab"
        particles="spice"
      />

      <section style={{ paddingTop: '120px', paddingBottom: '160px' }}>
        <div className="container-lv">
          <AnimatedSectionHeader
            eyebrow="Accreditations"
            title={<>Every standard. <span className="text-[#AC033B] italic font-serif font-medium">Every market.</span></>}
            description="From ISO to Organic, Halal to Kosher — we hold the certifications that open doors in every major market globally."
          />
          <AnimatedCards cards={certifications} />
        </div>
      </section>
    </>
  );
}
