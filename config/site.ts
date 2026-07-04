export const siteConfig = {
  name: 'LV Spices',
  tagline: 'The Spice Specialist',
  description:
    '50 years of spice export excellence. Cryogenic grinding, steam sterilization, CFG Science R&D. Premium spices from India to the world.',
  url: 'https://lvspices.com',
  parentCompany: 'Chillito Exports',
  handle: '@cfexports',
  legacy: '50 Years',
  foundedYear: 1975,
  hq: {
    address: '12, Marine House, 93 Dr Maheshwari Road',
    city: 'Mumbai',
    pincode: '400009',
    country: 'India',
    full: '12, Marine House, 93 Dr Maheshwari Road, Mumbai 400009, India',
  },
  contact: {
    phone: '+91 7279 900 500',
    email: 'cf@lvspices.com',
    whatsapp: '+917279900500',
  },
  social: {
    twitter: 'https://twitter.com/cfexports',
    youtube: 'https://youtube.com/@cfexports',
    instagram: 'https://instagram.com/cfexports',
    facebook: 'https://facebook.com/cfexports',
    linkedin: 'https://linkedin.com/company/lvspices',
  },
  seo: {
    title: 'LV Spices — The Spice Specialist | Premium Indian Spice Exporter',
    description:
      '50 years of spice export excellence. Cryogenic grinding, steam sterilization, CFG Science R&D. ISO 17025, NABL, Sedex certified. Premium spices from India to the world.',
    keywords: [
      'Indian spices exporter',
      'cryogenic grinding',
      'spice manufacturer India',
      'premium spices',
      'LV Spices',
      'Chillito Exports',
      'steam sterilization spices',
      'CFG Science',
      'organic spices exporter',
      'FSSAI certified spices',
      'ISO 17025 spice lab',
      'NABL accredited',
      'Sedex certified',
      'private label spices',
      'bulk spice supplier',
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
