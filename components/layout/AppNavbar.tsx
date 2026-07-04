'use client';

import CardNav from '@/components/ui/CardNav';

const TechIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" width="20" height="20">
    <circle cx="22" cy="22" r="21" stroke="#AC033B" strokeWidth="1.8" fill="none"/>
    <path d="M22 14a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" stroke="#AC033B" strokeWidth="1.6"/>
    <path d="M22 10v2M22 32v2M10 22h2M32 22h2" stroke="#AC033B" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="22" cy="22" r="2.5" fill="#AC033B"/>
  </svg>
);

const ProductsIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" width="20" height="20">
    <circle cx="22" cy="22" r="21" stroke="#AC033B" strokeWidth="1.8" fill="none"/>
    <path d="M13 18h18M16 18l2-5h8l2 5" stroke="#AC033B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 18l2 12a1.5 1.5 0 001.5 1h9a1.5 1.5 0 001.5-1l2-12" stroke="#AC033B" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M19 23c1 1.5 3 2 5 1" stroke="#AC033B" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const CompanyIcon = () => (
  <svg viewBox="0 0 44 44" fill="none" width="20" height="20">
    <circle cx="22" cy="22" r="21" stroke="#AC033B" strokeWidth="1.8" fill="none"/>
    <rect x="12" y="14" width="20" height="17" rx="2" stroke="#AC033B" strokeWidth="1.6"/>
    <path d="M17 14v-2h10v2" stroke="#AC033B" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M17 21h2M23 21h2M17 26h2M23 26h2" stroke="#AC033B" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function AppNavbar() {
  const items = [
    {
      label: 'Technology',
      icon: <TechIcon />,
      bgColor: '#ffffff',
      textColor: '#111',
      links: [
        { label: 'Overview', ariaLabel: 'Technology Overview', href: '/technology' },
        { label: 'Cryogenic Grinding', ariaLabel: 'Cryogenic Grinding', href: '/technology/cryogenic-grinding' },
        { label: 'Steam Sterilization', ariaLabel: 'Steam Sterilization', href: '/technology/steam-sterilization' },
        { label: 'CFG Science (R&D Centre)', ariaLabel: 'CFG Science', href: '/technology/cfg-science' },
        { label: 'Quality Control', ariaLabel: 'Quality Control', href: '/technology/quality-assurance' },
        { label: 'Infrastructure', ariaLabel: 'Infrastructure', href: '/technology/infrastructure' },
        { label: 'Process Flow', ariaLabel: 'Process Flow', href: '/technology/process-flow' },
      ],
    },
    {
      label: 'Products',
      icon: <ProductsIcon />,
      bgColor: '#ffffff',
      textColor: '#111',
      links: [
        { label: 'Spices & Seasoning', ariaLabel: 'Spices & Seasoning', href: '/products/spices-seasoning' },
        { label: 'Spices & Seasoning (No Onion No Garlic)', ariaLabel: 'No Onion No Garlic', href: '/products/no-onion-no-garlic' },
        { label: 'Curry Powder', ariaLabel: 'Curry Powder', href: '/products/curry-powder' },
        { label: 'Snack Seasoning', ariaLabel: 'Snack Seasoning', href: '/products/snack-seasoning' },
        { label: 'Agri Products', ariaLabel: 'Agri Products', href: '/products/agri-products' },
        { label: 'Organic', ariaLabel: 'Organic', href: '/products/organic' },
        { label: 'Supermarket', ariaLabel: 'Supermarket', href: '/products/supermarket' },
        { label: 'Milliet', ariaLabel: 'Milliet', href: '/products/millet' },
        { label: 'Chilli Speciality', ariaLabel: 'Chilli Speciality', href: '/products/chilli-speciality' },
        { label: 'Dehydrated', ariaLabel: 'Dehydrated', href: '/products/dehydrated' },
        { label: 'Botnical Powders', ariaLabel: 'Botnical Powders', href: '/products/botanical-powders' },
        { label: 'Herbal Teas', ariaLabel: 'Herbal Teas', href: '/products/herbal-teas' },
      ],
    },
    {
      label: 'Company',
      icon: <CompanyIcon />,
      bgColor: '#ffffff',
      textColor: '#111',
      links: [
        { label: 'Our Story', ariaLabel: 'Our Story', href: '/story' },
        { label: 'Mission & Vision', ariaLabel: 'Mission & Vision', href: '/story' },
        { label: 'Certifications', ariaLabel: 'Certifications', href: '/certifications' },
        { label: 'Sustainability', ariaLabel: 'Sustainability', href: '/story' },
        { label: 'Contact Us', ariaLabel: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-[9999]">
      <CardNav
        logo="/logo.png"
        logoAlt="LV Spices Logo"
        items={items}
        baseColor="#ffffff"
        menuColor="#AC033B"
        buttonBgColor="#AC033B"
        buttonTextColor="#ffffff"
        ease="power3.out"
      />
    </div>
  );
}
