import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface PageSEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
}

export function generatePageMeta({
  title,
  description,
  path = '',
  image,
  keywords,
}: PageSEOProps = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.seo.title;
  const pageDescription = description || siteConfig.seo.description;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/og-image.jpg`;

  return {
    title: {
      default: pageTitle,
      template: `%s | India's Trusted Spice Manufacturer, Supplier & Exporter`,
    },
    description: pageDescription,
    keywords: keywords || [...siteConfig.seo.keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
      creator: siteConfig.handle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ManufacturingBusiness'],
    name: siteConfig.name,
    alternateName: [siteConfig.parentCompany, 'LV Spices Mumbai', 'Chillito Exports'],
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${siteConfig.url}/images/hero-spices.png`,
    description: "LV Spices (Chillito Exports) is India's trusted spice manufacturer, supplier & exporter since 1975. Specializing in bulk spices, OEM production, private label branding, and custom spice blending. FSSC 22000, ISO 22000, NABL, HACCP, FSSAI, FDA, Halal, and Sedex certified.",
    foundingDate: `${siteConfig.foundedYear}`,
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 100,
      maxValue: 500,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.hq.address,
      addressLocality: siteConfig.hq.city,
      postalCode: siteConfig.hq.pincode,
      addressCountry: siteConfig.hq.country,
      addressRegion: 'Maharashtra',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.9633,
      longitude: 72.8349,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        contactType: 'sales',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'Worldwide',
      },
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.whatsapp,
        contactType: 'customer service',
        contactOption: 'WhatsApp',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Spice Products & Services Catalog',
      numberOfItems: 500,
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Bulk Ground Spices' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Whole Spices Export' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Spice Blends & Masalas' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'OEM Spice Manufacturing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Private Label Branding' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Spice Blending' } },
      ],
    },
    areaServed: ['IN', 'US', 'GB', 'DE', 'NL', 'CA', 'AU', 'AE', 'SA', 'SG', 'MY', 'ZA'],
    knowsAbout: [
      'Cryogenic Spice Grinding',
      'Steam Sterilization of Spices',
      'Spice Export Compliance',
      'Private Label Food Manufacturing',
      'FSSC 22000 Food Safety',
      'Halal Spice Certification',
      'NABL Laboratory Testing',
      'Bulk Spice Supply Chain',
    ],
    award: [
      'FSSC 22000 Certified',
      'ISO 22000 Certified',
      'NABL Accredited Laboratory',
      'Sedex Ethical Trade Certified',
      'Halal Certified',
      'FDA Registered Facility',
    ],
    sameAs: Object.values(siteConfig.social),
  };
}

/** FAQ schema for AEO/Featured Snippets — use on relevant pages */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

/** Breadcrumb schema for all interior pages */
export function generateBreadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${siteConfig.url}${crumb.url}`,
    })),
  };
}

/** Product schema for individual spice product pages */
export function generateProductSchema(product: {
  name: string;
  description: string;
  image?: string;
  sku?: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image || `${siteConfig.url}/images/hero-spices.png`,
    sku: product.sku,
    category: product.category || 'Food & Beverage > Spices & Herbs',
    brand: { '@type': 'Brand', name: siteConfig.name },
    manufacturer: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: siteConfig.name },
      areaServed: 'Worldwide',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
        description: 'Contact for bulk pricing',
      },
    },
  };
}

