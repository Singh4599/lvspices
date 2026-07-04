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
    title: pageTitle,
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
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: siteConfig.parentCompany,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.seo.description,
    foundingDate: `${siteConfig.foundedYear}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.hq.address,
      addressLocality: siteConfig.hq.city,
      postalCode: siteConfig.hq.pincode,
      addressCountry: siteConfig.hq.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: 'sales',
    },
    sameAs: Object.values(siteConfig.social),
  };
}
