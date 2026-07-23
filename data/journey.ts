export interface Milestone {
  year: string;
  title: string;
  tagline: string;
  pill: string;
  img: string;
  alt: string;
}

export const milestones: Milestone[] = [
  {
    year: '1975',
    title: 'It All Began',
    tagline: 'A small beginning with big determination.',
    pill: 'ORIGIN',
    img: '/images/story_1975.png',
    alt: 'Elderly Indian man grinding spices in a small home workshop in 1975',
  },
  {
    year: '1985',
    title: 'First Shop',
    tagline: 'Our first step into the market, built on trust and quality.',
    pill: 'RETAIL',
    img: '/images/story_1985.png',
    alt: 'First LV Spices shop with spice sacks and jars on display in 1985',
  },
  {
    year: '1995',
    title: 'First Factory',
    tagline: 'Passion turned into process. The foundation of our growth.',
    pill: 'INDUSTRY',
    img: '/images/story_1995.png',
    alt: 'Early LV Spices factory with stainless-steel processing equipment in 1995',
  },
  {
    year: '2005',
    title: 'Modernization',
    tagline: 'Adopting advanced technology while staying true to our roots.',
    pill: 'TECHNOLOGY',
    img: '/images/spice_facility.png',
    alt: 'Modern automated production line with conveyors and packaging machinery in 2005',
  },
  {
    year: '2012',
    title: 'Quality & Innovation',
    tagline: 'Science meets spice. Precision at every step.',
    pill: 'SCIENCE',
    img: '/images/story_2012.png',
    alt: 'Quality control laboratory with microscopes and testing equipment in 2012',
  },
  {
    year: '2020',
    title: 'Global Expansion',
    tagline: 'From India, to the world.',
    pill: 'GLOBAL',
    img: '/images/lv_journey_3.png',
    alt: 'Wide spice assortment representing global expansion in 2020',
  },
  {
    year: '2025',
    title: '50 Years',
    tagline: 'Five decades of passion, purpose, and purity.',
    pill: 'LEGACY',
    img: '/images/spices_aerial.png',
    alt: 'Premium artistic spice mandala celebrating 50 years of LV Spices',
  },
];
