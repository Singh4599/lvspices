export interface Certification {
  id: string;
  name: string;
  fullName: string;
  issuingBody: string;
  description: string;
  buyerBenefit: string;
}

export const certifications: Certification[] = [
  {
    id: 'iso-9001',
    name: 'ISO 9001',
    fullName: 'ISO 9001:2015 Quality Management System',
    issuingBody: 'International Organization for Standardization',
    description: 'Demonstrates consistent quality management across all manufacturing and administrative processes.',
    buyerBenefit: 'Assurance that LV Spices maintains documented quality processes with continuous improvement.',
  },
  {
    id: 'iso-17025',
    name: 'ISO 17025',
    fullName: 'ISO/IEC 17025 Laboratory Testing & Calibration',
    issuingBody: 'International Organization for Standardization',
    description: 'Our in-house laboratories meet international standards for testing competence and impartiality.',
    buyerBenefit: 'Lab results are internationally recognized and equivalent to third-party testing.',
  },
  {
    id: 'nabl',
    name: 'NABL',
    fullName: 'National Accreditation Board for Testing and Calibration Laboratories',
    issuingBody: 'Quality Council of India',
    description: 'India\'s apex laboratory accreditation body. Confirms our labs meet ISO 17025 requirements.',
    buyerBenefit: 'Internationally recognized lab accreditation — your COAs carry global credibility.',
  },
  {
    id: 'fssai',
    name: 'FSSAI',
    fullName: 'Food Safety and Standards Authority of India',
    issuingBody: 'Government of India',
    description: 'Mandatory food safety license for all food manufacturing operations in India.',
    buyerBenefit: 'Legal compliance with Indian food safety regulations.',
  },
  {
    id: 'sedex',
    name: 'Sedex-SMETA',
    fullName: 'Sedex Members Ethical Trade Audit',
    issuingBody: 'Sedex',
    description: 'Ethical trade audit covering labour standards, health & safety, environment, and business ethics.',
    buyerBenefit: 'ESG compliance documentation for your supply chain audits.',
  },
  {
    id: 'usda-organic',
    name: 'USDA Organic',
    fullName: 'USDA National Organic Program',
    issuingBody: 'United States Department of Agriculture',
    description: 'Certification for organic products meeting USDA National Organic Program standards.',
    buyerBenefit: 'Legal requirement for selling organic products in the United States.',
  },
  {
    id: 'eu-organic',
    name: 'EU Organic',
    fullName: 'European Union Organic Certification',
    issuingBody: 'European Commission',
    description: 'Organic certification meeting EU Regulation 2018/848 for organic production.',
    buyerBenefit: 'Legal requirement for selling organic products in the European Union.',
  },
  {
    id: 'apeda',
    name: 'APEDA',
    fullName: 'Agricultural & Processed Food Products Export Development Authority',
    issuingBody: 'Government of India',
    description: 'Registration with India\'s apex agricultural export promotion body.',
    buyerBenefit: 'Confirms LV Spices is a registered and recognized Indian food exporter.',
  },
  {
    id: 'spice-board',
    name: 'Spice Board',
    fullName: 'Spice Board of India Registration',
    issuingBody: 'Ministry of Commerce, Government of India',
    description: 'Registration with India\'s regulatory body for spice export quality standards.',
    buyerBenefit: 'Ensures spice quality meets India\'s export standards and traceability requirements.',
  },
];

export const certificationLogos: Record<string, string> = {
  'iso-9001': '/certifications/iso-9001.svg',
  'iso-17025': '/certifications/iso-17025.svg',
  'nabl': '/certifications/nabl.svg',
  'fssai': '/certifications/fssai.svg',
  'sedex': '/certifications/sedex.svg',
  'usda-organic': '/certifications/usda-organic.svg',
  'eu-organic': '/certifications/eu-organic.svg',
  'apeda': '/certifications/apeda.svg',
  'spice-board': '/certifications/spice-board.svg',
};
