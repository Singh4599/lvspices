export interface ExportRegion {
  name: string;
  countries: string[];
}

export const exportRegions: ExportRegion[] = [
  {
    name: 'European Union',
    countries: ['Germany', 'Netherlands', 'France', 'Italy', 'Spain', 'Belgium', 'Poland', 'Sweden', 'Denmark', 'Austria'],
  },
  {
    name: 'United Kingdom',
    countries: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  },
  {
    name: 'North America',
    countries: ['United States', 'Canada'],
  },
  {
    name: 'Middle East',
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain'],
  },
  {
    name: 'Asia Pacific',
    countries: ['Singapore', 'Australia', 'Japan', 'Malaysia', 'South Korea', 'New Zealand', 'Thailand'],
  },
  {
    name: 'Africa',
    countries: ['South Africa', 'Kenya', 'Nigeria', 'Tanzania', 'Mauritius'],
  },
];

export interface ExportDestination {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export const exportDestinations: ExportDestination[] = [
  { city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278 },
  { city: 'Rotterdam', country: 'Netherlands', lat: 51.9244, lng: 4.4777 },
  { city: 'Hamburg', country: 'Germany', lat: 53.5511, lng: 9.9937 },
  { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { city: 'Milan', country: 'Italy', lat: 45.4642, lng: 9.1900 },
  { city: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734 },
  { city: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060 },
  { city: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437 },
  { city: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  { city: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { city: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753 },
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { city: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869 },
  { city: 'Johannesburg', country: 'South Africa', lat: -26.2041, lng: 28.0473 },
  { city: 'Nairobi', country: 'Kenya', lat: -1.2921, lng: 36.8219 },
  { city: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686 },
  { city: 'Copenhagen', country: 'Denmark', lat: 55.6761, lng: 12.5683 },
  { city: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777 },
];

export const exportStats = {
  destinations: '40+',
  containersAnnual: '500+',
  exportExperience: '25+ Years',
  incoterms: ['FOB Mumbai', 'CIF', 'CFR'],
  documentation: [
    'Certificate of Analysis (COA)',
    'SGS Inspection Report',
    'Phytosanitary Certificate',
    'Fumigation Certificate',
    'Health Certificate',
    'Certificate of Origin',
    'Packing List',
    'Bill of Lading',
  ],
};
