export interface NavItem {
  label: string;
  href: string;
  children?: NavGroup[];
}

export interface NavGroup {
  title: string;
  items: { label: string; href: string; description?: string }[];
}

export const mainNavItems: NavItem[] = [
  {
    label: 'Our Story',
    href: '/story',
  },
  {
    label: 'Technology',
    href: '/technology',
    children: [
      {
        title: 'Our Technology',
        items: [
          { label: 'All Technology (Overview)', href: '/technology', description: 'Explore our state-of-the-art facilities' },
          { label: 'Cryogenic Grinding', href: '/technology/cryogenic-grinding', description: 'Grinding at -40°C to preserve essential oils' },
          { label: 'CFG Science', href: '/technology/cfg-science', description: 'The world\'s first spice research centre' },
          { label: 'Steam Sterilization', href: '/technology/steam-sterilization', description: '5-log microbial reduction systems' },
          { label: 'Quality Assurance', href: '/technology/quality-assurance', description: '30+ scientists, 3 accredited labs' },
        ],
      },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    children: [
      {
        title: 'Product Categories',
        items: [
          { label: 'All Products (Overview)', href: '/products' },
          { label: 'Spices & Seasoning', href: '/products/spices-seasoning' },
          { label: 'No Onion No Garlic', href: '/products/no-onion-no-garlic' },
          { label: 'Curry Powder', href: '/products/curry-powder' },
          { label: 'Snack Seasoning', href: '/products/snack-seasoning' },
          { label: 'Agri Products', href: '/products/agri-products' },
          { label: 'Organic', href: '/products/organic' },
          { label: 'Supermarket', href: '/products/supermarket' },
          { label: 'Millet', href: '/products/millet' },
          { label: 'Chilli Speciality', href: '/products/chilli-speciality' },
          { label: 'Dehydrated', href: '/products/dehydrated' },
          { label: 'Botanical Powders', href: '/products/botanical-powders' },
          { label: 'Herbal Teas', href: '/products/herbal-teas' },
        ],
      },
    ],
  },
  {
    label: 'Certifications',
    href: '/certifications',
  },
];

export const secondaryNavItems = [
  { label: 'Global Network', href: '/global-network' },
  { label: 'Blog', href: '/blog' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Contact', href: '/contact' },
];
