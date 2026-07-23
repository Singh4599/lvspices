export interface Benefit {
  icon: string;
  label: string;
  detail: string;
}

export const benefits: Benefit[] = [
  { icon: 'farm',    label: 'Farm Direct',    detail: 'Source to shelf traceability' },
  { icon: 'lab',     label: 'NABL Lab',       detail: 'Accredited in-house testing' },
  { icon: 'globe',   label: '40+ Nations',    detail: 'Trusted worldwide' },
  { icon: 'cryo',    label: 'Cryogenic',      detail: 'Aroma & nutrition preserved' },
  { icon: 'steam',   label: 'Sterilized',     detail: 'Steam sterilization standard' },
  { icon: 'label',   label: 'Private Label',  detail: 'Custom brand solutions' },
  { icon: 'brc',     label: 'BRC Tier 2',     detail: 'Global food safety standard' },
  { icon: 'trace',   label: 'Traceable',      detail: 'Batch-level transparency' },
];
